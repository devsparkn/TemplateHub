import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import UserTemplate from "@/models/UserTemplate";
import Order from "@/models/Order";
import dbConnect from "@/lib/mongodb";
import Stripe from "stripe";
import { sendPurchaseConfirmationEmail } from "@/lib/email-service";

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY || "sk_test_placeholder",
  {
    apiVersion: "2025-04-30.basil",
  }
);

type CheckoutItem = {
  templateId: string;
  title: string;
  price: number;
};

export async function POST(req: Request) {
  try {
    // Connect to MongoDB
    console.log("Connecting to database...");
    await dbConnect();
    console.log("Database connected");

    // Get user session
    console.log("Getting server session...");
    const session = await getServerSession(authOptions);
    console.log("Session retrieved:", session ? "exists" : "missing");

    if (!session || !session.user?.email) {
      console.error("Unauthorized access attempt");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse request body
    console.log("Parsing request body...");
    const body = await req.json();
    console.log("Request body:", JSON.stringify(body, null, 2));

    const { session_id, items } = body;

    if (!session_id) {
      console.error("Missing session_id");
      return NextResponse.json(
        { error: "Missing session_id" },
        { status: 400 }
      );
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      console.error("Invalid items array");
      return NextResponse.json(
        { error: "Invalid or empty items array" },
        { status: 400 }
      );
    }

    // Verify Stripe session
    console.log("Verifying Stripe session:", session_id);
    let stripeSession;
    try {
      stripeSession = await stripe.checkout.sessions.retrieve(session_id);
      console.log("Stripe session retrieved:", stripeSession.id);

      if (stripeSession.payment_status !== "paid") {
        console.error(
          `Payment not completed. Status: ${stripeSession.payment_status}`
        );
        return NextResponse.json(
          {
            error: `Payment not completed. Status: ${stripeSession.payment_status}`,
          },
          { status: 400 }
        );
      }
    } catch (error: unknown) {
      let errorMessage = "Unknown error";
      if (error && typeof error === "object" && "message" in error) {
        errorMessage = (error as { message: string }).message;
      }
      console.error("Stripe session retrieval error:", errorMessage);
      return NextResponse.json(
        { error: `Invalid session_id: ${errorMessage}` },
        { status: 400 }
      );
    }

    const userId = session.user.id;
    console.log("Processing items for user:", userId);

    // Assign templates to user
    try {
      console.log("Assigning templates...");
      for (const item of items as CheckoutItem[]) {
        console.log(`Processing template: ${item.templateId}`);
        await UserTemplate.updateOne(
          { userId, templateId: item.templateId },
          { $set: { userId, templateId: item.templateId } },
          { upsert: true }
        );
      }
      console.log("Templates assigned successfully");
    } catch (dbError: unknown) {
      let errorMessage = "Unknown error";
      if (dbError && typeof dbError === "object" && "message" in dbError) {
        errorMessage = (dbError as { message: string }).message;
      }
      console.error("Database update error:", errorMessage);
      return NextResponse.json(
        { error: `Failed to assign templates: ${errorMessage}` },
        { status: 500 }
      );
    }

    // Create order record
    try {
      console.log("Creating order record...");
      const total = (items as CheckoutItem[]).reduce(
        (sum, item) => sum + Number(item.price),
        0
      );

      const order = (await Order.create({
        userId,
        items: (items as CheckoutItem[]).map((item) => ({
          templateId: item.templateId,
          title: item.title,
          price: item.price,
        })),
        total,
        status: "paid",
        stripeSessionId: session_id,
      })) as { _id: { toString: () => string } };

      console.log("Order created:", order._id.toString());

      // Send purchase confirmation email
      try {
        console.log("Sending confirmation email...");
        await sendPurchaseConfirmationEmail(
          session.user.email,
          items,
          order._id.toString()
        );
        console.log("Confirmation email sent");
      } catch (emailError: unknown) {
        let errorMessage = "Unknown error";
        if (
          emailError &&
          typeof emailError === "object" &&
          "message" in emailError
        ) {
          errorMessage = (emailError as { message: string }).message;
        }
        console.error("Email sending error:", errorMessage);
        // Don't fail the request just because email failed
      }

      return NextResponse.json({ success: true });
    } catch (orderError: unknown) {
      let errorMessage = "Unknown error";
      if (
        orderError &&
        typeof orderError === "object" &&
        "message" in orderError
      ) {
        errorMessage = (orderError as { message: string }).message;
      }
      console.error("Order creation error:", errorMessage);
      return NextResponse.json(
        { error: `Failed to create order: ${errorMessage}` },
        { status: 500 }
      );
    }
  } catch (error: unknown) {
    let errorMessage = "Unknown error";
    let errorStack = "";
    if (error && typeof error === "object" && "message" in error) {
      errorMessage = (error as { message: string }).message;
    }
    if (error && typeof error === "object" && "stack" in error) {
      errorStack = (error as { stack: string }).stack;
    }
    console.error("Unhandled exception in verify endpoint:", errorMessage);
    if (errorStack) {
      console.error(errorStack);
    }
    return NextResponse.json(
      { error: `Internal server error: ${errorMessage}` },
      { status: 500 }
    );
  }
}

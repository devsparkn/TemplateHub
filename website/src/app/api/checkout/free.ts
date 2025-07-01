import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import UserTemplate from "@/models/UserTemplate";
import Order from "@/models/Order";

import dbConnect from "@/lib/mongodb";
import { sendPurchaseConfirmationEmail } from "@/lib/email-service";

export async function POST(req: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = session.user.id;
  interface FreeItem {
    templateId: string;
    title: string;
    price: string;
  }

  const { items } = await req.json();
  if (!items || !Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: "No items provided" }, { status: 400 });
  }
  // Only allow free items
  const freeItems: FreeItem[] = items.filter(
    (item: FreeItem) => item.price === "Free"
  );
  if (freeItems.length !== items.length) {
    return NextResponse.json(
      { error: "Non-free items detected" },
      { status: 400 }
    );
  }
  // Assign templates to user
  for (const item of freeItems) {
    await UserTemplate.updateOne(
      { userId, templateId: item.templateId },
      { $set: { userId, templateId: item.templateId } },
      { upsert: true }
    );
  }
  // Create order record
  const order = (await Order.create({
    userId,
    items: freeItems.map((item: FreeItem) => ({
      templateId: item.templateId,
      title: item.title,
      price: "Free",
    })),
    total: 0,
    status: "free",
    stripeSessionId: null,
  })) as typeof Order extends { prototype: infer T } ? T : never;
  // Send purchase confirmation email
  await sendPurchaseConfirmationEmail(
    session.user.email,
    freeItems,
    order._id.toString()
  );
  return NextResponse.json({ success: true });
}

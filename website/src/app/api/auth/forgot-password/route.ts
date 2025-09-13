import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { createOTP, sendPasswordResetEmail } from "@/lib/email-service";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    await dbConnect();

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "No account found with this email address." },
        { status: 404 }
      );
    }

    // Generate OTP and send email
    const otp = await createOTP(email, "password-reset");
    await sendPasswordResetEmail(email, otp);

    return NextResponse.json(
      { success: true, message: "OTP sent to your email address." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Forgot password error:", error);
    const msg = error instanceof Error ? error.message : "Something went wrong. Please try again later.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

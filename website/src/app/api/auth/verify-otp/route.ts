import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { verifyOTP } from "@/lib/email-service";

export async function POST(req: NextRequest) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json(
        { error: "Email and OTP required" },
        { status: 400 }
      );
    }

    await dbConnect();
    const isValid = await verifyOTP(email, otp, "password-reset");

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid or expired OTP" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Verify OTP error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

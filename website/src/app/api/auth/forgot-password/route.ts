import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { createOTP, sendPasswordResetEmail } from '@/lib/email-service';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }
    
    // Connect to database
    await dbConnect();
    
    // Check if user exists
    const user = await User.findOne({ email });
    
    if (!user) {
      // For security reasons, we don't want to disclose whether a user exists
      // So we return success even if the user is not found
      return NextResponse.json(
        { success: true, message: 'If your email exists in our system, you will receive a password reset OTP.' },
        { status: 200 }
      );
    }
    
    // Generate and save OTP
    const otp = await createOTP(email, 'password-reset');
    
    // Send password reset email
    await sendPasswordResetEmail(email, otp);
    
    return NextResponse.json(
      { success: true, message: 'If your email exists in our system, you will receive a password reset OTP.' },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error('Forgot password error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Something went wrong';
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
} 
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { verifyOTP } from '@/lib/email-service';

export async function POST(request: NextRequest) {
  try {
    const { email, otp, newPassword } = await request.json();
    
    if (!email || !otp || !newPassword) {
      return NextResponse.json(
        { error: 'Email, OTP, and new password are required' },
        { status: 400 }
      );
    }
    
    // Password validation
    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }
    
    // Connect to database
    await dbConnect();
    
    // Verify OTP
    const isOTPValid = await verifyOTP(email, otp, 'password-reset');
    
    if (!isOTPValid) {
      return NextResponse.json(
        { error: 'Invalid or expired OTP' },
        { status: 400 }
      );
    }
    
    // Find user and update password
    const user = await User.findOne({ email });
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Update password
    user.password = newPassword; // Will be hashed by the pre-save hook
    await user.save();
    
    return NextResponse.json(
      { success: true, message: 'Password reset successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Reset password error:', error);
    
    return NextResponse.json(
      { error: error.message || 'Something went wrong' },
      { status: 500 }
    );
  }
} 
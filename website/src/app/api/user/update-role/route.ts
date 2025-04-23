import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

// IMPORTANT: Replace this with your actual email address
const ADMIN_EMAIL = 'nadeemchaudhary808@gmail.com';

export async function POST() {
  try {
    // Get the current session
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const userEmail = session.user.email;
    
    // Check if the email matches the allowed admin email
    if (userEmail !== ADMIN_EMAIL) {
      return NextResponse.json(
        { success: false, message: 'Only the site owner can become an admin' },
        { status: 403 }
      );
    }
    
    await dbConnect();
    
    // Find the user by email
    const user = await User.findOne({ email: userEmail });
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }
    
    // Update the user role to admin
    user.role = 'admin';
    await user.save();
    
    return NextResponse.json({
      success: true,
      message: 'Successfully updated to admin role'
    });
  } catch (error) {
    console.error('Error updating user role:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update user role' },
      { status: 500 }
    );
  }
} 
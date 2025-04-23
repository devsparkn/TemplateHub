import { NextResponse } from 'next/server';
import User from '@/models/User';
import dbConnect from '@/lib/mongodb';
import { getServerSession } from 'next-auth';

// The only allowed admin email
const ADMIN_EMAIL = 'nadeemchaudhary808@gmail.com';

export async function GET(request: Request) {
  try {
    await dbConnect();
    
    // Extract query parameters for pagination
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;
    
    // Find users with pagination, excluding password
    const users = await User.find({})
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
    
    // Get total count for pagination
    const totalUsers = await User.countDocuments({});
    
    return NextResponse.json({
      success: true,
      users,
      pagination: {
        total: totalUsers,
        page,
        limit,
        pages: Math.ceil(totalUsers / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

// Handle PUT requests to update user (e.g. role changes)
export async function PUT(request: Request) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Only the designated admin can make role changes
    if (session.user.email !== ADMIN_EMAIL) {
      return NextResponse.json(
        { success: false, message: 'Only the site owner can change user roles' },
        { status: 403 }
      );
    }
    
    await dbConnect();
    
    const body = await request.json();
    const { userId, updates } = body;
    
    // If trying to update role to admin, block it unless it's for the designated admin
    if (updates.role === 'admin') {
      const targetUser = await User.findById(userId);
      if (!targetUser) {
        return NextResponse.json(
          { success: false, message: 'User not found' },
          { status: 404 }
        );
      }
      
      if (targetUser.email !== ADMIN_EMAIL) {
        return NextResponse.json(
          { success: false, message: 'Only the site owner can be an admin' },
          { status: 403 }
        );
      }
    }
    
    // Update the user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true }
    ).select('-password');
    
    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      user: updatedUser
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update user' },
      { status: 500 }
    );
  }
} 
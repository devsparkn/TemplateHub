import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Template from '@/models/Template';

// A special debug API route to check database contents
export async function GET() {
  try {
    await dbConnect();
    
    // Check if templates collection exists and get count
    const count = await Template.countDocuments({});
    
    // Get first few templates to check their slugs
    const templates = await Template.find({}).limit(10).select('slug title');
    
    // Return debugging information
    return NextResponse.json({
      success: true,
      count,
      templates,
      connectionStatus: 'Connected to MongoDB',
      message: count > 0 ? 'Templates found' : 'No templates in database'
    });
  } catch (error) {
    console.error('Debug API error:', error);
    return NextResponse.json({
      success: false,
      error: `Database error: ${(error as Error).message}`,
      connectionStatus: 'Failed to connect to MongoDB'
    }, { status: 500 });
  }
} 
import { NextResponse } from 'next/server';
import dbConnect from "@/lib/mongodb";
import Template from "@/models/Template";

// GET all templates with optional filtering
export async function GET(request: Request) {
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;
    const exclude = searchParams.get('exclude');
    
    // Establish database connection first
    await dbConnect();
    
    // Build query
    const query: Record<string, unknown> = {};
    if (category) {
      query.category = category;
    }
    if (exclude) {
      query._id = { $ne: exclude };
    }
    
    // Execute query
    let templates = await Template.find(query);
    
    // Apply limit if specified
    if (limit && templates.length > limit) {
      templates = templates.slice(0, limit);
    }
    
    return NextResponse.json({ success: true, data: templates });
  } catch (error) {
    console.error('Error fetching templates:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch templates' },
      { status: 500 }
    );
  }
}

// POST new template
export async function POST(request: Request) {
  try {
    // Establish database connection first
    await dbConnect();
    
    const body = await request.json();
    
    // Validate required fields
    if (!body.slug || !body.title || !body.description || !body.category) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if template with same slug exists
    const existingTemplate = await Template.findOne({ slug: body.slug });
    if (existingTemplate) {
      return NextResponse.json(
        { success: false, error: 'Template with this slug already exists' },
        { status: 400 }
      );
    }

    const template = await Template.create(body);
    return NextResponse.json({ success: true, data: template });
  } catch (error) {
    console.error('Error creating template:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create template' },
      { status: 500 }
    );
  }
}

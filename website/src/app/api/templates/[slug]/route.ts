import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Template from '@/models/Template';

// GET template by slug
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    // Access the slug only after ensuring params is awaited
    const slug = await Promise.resolve(params.slug);
    
    // Establish database connection first
    await dbConnect();
    
    // Then query for the template
    const template = await Template.findOne({ slug });
    
    if (!template) {
      return NextResponse.json(
        { success: false, error: 'Template not found' },
        { status: 404 }
      );
    }

    // Return the template data directly
    return NextResponse.json(template);
  } catch (error) {
    console.error('Error fetching template:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch template' },
      { status: 500 }
    );
  }
}

// PUT (update) template by slug
export async function PUT(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    // Access the slug only after ensuring params is awaited
    const slug = await Promise.resolve(params.slug);
    const body = await req.json();

    // Establish database connection first
    await dbConnect();

    const updatedTemplate = await Template.findOneAndUpdate({ slug }, body, {
      new: true,
    });
    if (!updatedTemplate) {
      return NextResponse.json(
        { success: false, error: "Template not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updatedTemplate });
  } catch (error) {
    console.error('Error updating template:', error);
    return NextResponse.json(
      { success: false, error: "Failed to update template" },
      { status: 400 }
    );
  }
}

// DELETE template by slug
export async function DELETE(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    // Access the slug only after ensuring params is awaited
    const slug = await Promise.resolve(params.slug);
    
    // Establish database connection first
    await dbConnect();

    const deletedTemplate = await Template.findOneAndDelete({ slug });
    if (!deletedTemplate) {
      return NextResponse.json(
        { success: false, error: "Template not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Template deleted" });
  } catch (error) {
    console.error('Error deleting template:', error);
    return NextResponse.json(
      { success: false, error: "Failed to delete template" },
      { status: 500 }
    );
  }
}


import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Template from "@/models/Template";

// GET template by slug
export async function GET(request: NextRequest, context: { params: { slug: string } }) {
  try {
    await dbConnect();
    const { slug } = context.params;
    const template = await Template.findOne({ slug });

    if (!template) {
      return NextResponse.json(
        { success: false, error: "Template not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(template);
  } catch (error) {
    console.error("Error fetching template:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch template" },
      { status: 500 }
    );
  }
}

// PUT handler
export async function PUT(request: NextRequest, context: { params: { slug: string } }) {
  try {
    const body = await request.json();
    await dbConnect();

    const { slug } = context.params;
    const updatedTemplate = await Template.findOneAndUpdate(
      { slug },
      body,
      { new: true }
    );

    if (!updatedTemplate) {
      return NextResponse.json(
        { success: false, error: "Template not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updatedTemplate });
  } catch (error) {
    console.error("Error updating template:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update template" },
      { status: 400 }
    );
  }
}

// DELETE handler
export async function DELETE(request: NextRequest, context: { params: { slug: string } }) {
  try {
    await dbConnect();

    const { slug } = context.params;
    const deletedTemplate = await Template.findOneAndDelete({ slug });

    if (!deletedTemplate) {
      return NextResponse.json(
        { success: false, error: "Template not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Template deleted" });
  } catch (error) {
    console.error("Error deleting template:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete template" },
      { status: 500 }
    );
  }
}

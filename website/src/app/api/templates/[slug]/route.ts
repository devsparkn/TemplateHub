import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Template from "@/models/Template";

// GET template by slug
export async function GET(
  req: NextRequest,
  context: { params: { slug: string } }
) {
  const params = await Promise.resolve(context.params);
  const { slug } = params;

  try {
    await dbConnect();
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

export async function PUT(
  req: NextRequest,
  context: { params: { slug: string } }
) {
  const params = await Promise.resolve(context.params);
  const { slug } = params;

  try {
    const body = await req.json();
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
    console.error("Error updating template:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update template" },
      { status: 400 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: { slug: string } }
) {
  const params = await Promise.resolve(context.params);
  const { slug } = params;

  try {
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
    console.error("Error deleting template:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete template" },
      { status: 500 }
    );
  }
}

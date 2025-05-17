import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Template from "@/models/Template";

// Helper to get slug value
const getSlug = (params: { slug: string | string[] }) => {
  return Array.isArray(params.slug) ? params.slug[0] : params.slug;
};

// GET template by slug
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string | string[] } }
) {
  const slug = getSlug(params);
  if (!slug) return invalidSlugResponse();

  try {
    await dbConnect();
    const template = await Template.findOne({ slug });
    return handleTemplateResponse(template);
  } catch (error) {
    return serverErrorResponse(error, "fetch");
  }
}

// PUT handler
export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string | string[] } }
) {
  const slug = getSlug(params);
  if (!slug) return invalidSlugResponse();

  try {
    const body = await request.json();
    await dbConnect();
    const updatedTemplate = await Template.findOneAndUpdate({ slug }, body, { new: true });
    return handleTemplateUpdateResponse(updatedTemplate);
  } catch (error) {
    return serverErrorResponse(error, "update");
  }
}

// DELETE handler
export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string | string[] } }
) {
  const slug = getSlug(params);
  if (!slug) return invalidSlugResponse();

  try {
    await dbConnect();
    const deletedTemplate = await Template.findOneAndDelete({ slug });
    return handleDeleteResponse(deletedTemplate);
  } catch (error) {
    return serverErrorResponse(error, "delete");
  }
}

// Response helpers
const invalidSlugResponse = () => {
  return NextResponse.json(
    { success: false, error: "Invalid slug parameter" },
    { status: 400 }
  );
};

const handleTemplateResponse = (template: unknown) => {
  if (!template) {
    return NextResponse.json(
      { success: false, error: "Template not found" },
      { status: 404 }
    );
  }
  return NextResponse.json(template);
};

const handleTemplateUpdateResponse = (template: unknown) => {
  if (!template) {
    return NextResponse.json(
      { success: false, error: "Template not found" },
      { status: 404 }
    );
  }
  return NextResponse.json({ success: true, data: template });
};

const handleDeleteResponse = (template: unknown) => {
  if (!template) {
    return NextResponse.json(
      { success: false, error: "Template not found" },
      { status: 404 }
    );
  }
  return NextResponse.json({ success: true, message: "Template deleted" });
};

const serverErrorResponse = (error: unknown, operation: string) => {
  console.error(`Error ${operation}ing template:`, error);
  return NextResponse.json(
    { success: false, error: `Failed to ${operation} template` },
    { status: 500 }
  );
};
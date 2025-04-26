import dbConnect from "@/lib/mongodb";
import Template from "@/models/Template";
import { Types } from "mongoose";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const { id } = params;

    if (!Types.ObjectId.isValid(id)) {
      return Response.json(
        { success: false, error: "Invalid ID" },
        { status: 400 }
      );
    }

    const template = await Template.findById(id);
    if (!template) {
      return Response.json(
        { success: false, error: "Template not found" },
        { status: 404 }
      );
    }

    return Response.json({ success: true, data: template });
  } catch {
    return Response.json(
      { success: false, error: "Failed to fetch template" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();

    await dbConnect();

    const updatedTemplate = await Template.findByIdAndUpdate(id, body, {
      new: true,
    });
    if (!updatedTemplate) {
      return Response.json(
        { success: false, error: "Template not found" },
        { status: 404 }
      );
    }

    return Response.json({ success: true, data: updatedTemplate });
  } catch {
    return Response.json(
      { success: false, error: "Failed to update template" },
      { status: 400 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    await dbConnect();

    const deletedTemplate = await Template.findByIdAndDelete(id);
    if (!deletedTemplate) {
      return Response.json(
        { success: false, error: "Template not found" },
        { status: 404 }
      );
    }

    return Response.json({ success: true, message: "Template deleted" });
  } catch {
    return Response.json(
      { success: false, error: "Failed to delete template" },
      { status: 500 }
    );
  }
}

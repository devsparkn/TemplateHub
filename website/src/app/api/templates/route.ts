import dbConnect from "@/lib/mongodb";
import Template from "@/models/Template";

export async function GET() {
  try {
    await dbConnect();
    const templates = await Template.find({});
    return Response.json({ success: true, data: templates });
  } catch (err) {
    console.error(err);
    return Response.json(
      { success: false, error: "Failed to fetch templates" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await dbConnect();

    const newTemplate = await Template.create(body);
    return Response.json({ success: true, data: newTemplate }, { status: 201 });
  } catch (err) {
    console.error(err);
    return Response.json(
      { success: false, error: "Failed to create template" },
      { status: 400 }
    );
  }
}

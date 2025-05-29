// app/api/templates/featured/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Template from "@/models/Template";

export async function GET() {
  await dbConnect();

  try {
    const templates = await Template.find({
      featured: true,
      isPublished: true,
    }).limit(10);

    return NextResponse.json({ success: true, data: templates });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}

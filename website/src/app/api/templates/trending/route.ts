// app/api/templates/trending/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Template from "@/models/Template";

export async function GET() {
  await dbConnect();

  const last7Days = new Date();
  last7Days.setDate(last7Days.getDate() - 7);

  try {
    const templates = await Template.find({
      isPublished: true,
      lastViewed: { $gte: last7Days },
    })
      .sort({ views: -1 })
      .limit(10);

    return NextResponse.json({ success: true, data: templates });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}

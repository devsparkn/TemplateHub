// app/api/templates/[slug]/view/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Template from "@/models/Template";

export async function POST(
  req: Request,
  { params }: { params: { slug: string } }
) {
  await dbConnect();

  try {
    const template = await Template.findOneAndUpdate(
      { slug: params.slug },
      {
        $inc: { views: 1 },
        $set: { lastViewed: new Date() },
      },
      { new: true }
    );

    return NextResponse.json({ success: true, data: template });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}

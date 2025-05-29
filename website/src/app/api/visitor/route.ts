import dbConnect from "@/lib/mongodb";
import Visitor from "@/models/Visitor";
import VisitorCount from "@/models/VisitorCount";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    // Extract IP address
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

    if (ip === "unknown") {
      return NextResponse.json(
        { error: "Unable to determine IP." },
        { status: 400 }
      );
    }

    const now = new Date();

    // Attempt to update or create the visitor record atomically
    const visitor = await Visitor.findOneAndUpdate(
      { ip },
      { $set: { lastVisited: now } },
      { upsert: true, new: true, runValidators: true }
    );

    // Check if the visitor was newly created
    let isNewVisitor = false;
    if (visitor) {
      const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      isNewVisitor = visitor.lastVisited < oneDayAgo;
    }

    let count;
    if (isNewVisitor) {
      // Atomically increment the total visitor count
      const counter = await VisitorCount.findOneAndUpdate(
        {},
        { $inc: { total: 1 } },
        { upsert: true, new: true }
      );
      count = counter.total;
    } else {
      // Fetch current count
      const counter = await VisitorCount.findOne();
      count = counter?.total || 0;
    }

    return NextResponse.json({ count });
  } catch (error) {
    console.error("Error in visitor tracking:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

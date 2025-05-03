import Template from "../models/Template.js";
import dbConnect from "@/lib/mongodb.js";
import { templates } from "@/utils/template.js";

async function seed() {
  try {
    await dbConnect();
    await Template.deleteMany(); // Optional: Clear existing templates
    console.log("🔄 Cleared existing templates");
    await Template.insertMany(templates);
    console.log("✅ Templates inserted!");
    process.exit();
  } catch (error) {
    console.error("❌ Failed to insert templates:", error);
    process.exit(1);
  }
}

seed();

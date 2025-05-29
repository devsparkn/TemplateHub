import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema({
  ip: { type: String, required: true, unique: true },
  lastVisited: { type: Date, required: true },
});

// Add TTL index to auto-delete documents after 24 hours
visitorSchema.index({ lastVisited: 1 }, { expireAfterSeconds: 24 * 60 * 60 });

const Visitor =
  mongoose.models.Visitor || mongoose.model("Visitor", visitorSchema);

export default Visitor;

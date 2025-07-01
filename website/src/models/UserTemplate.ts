import mongoose from "mongoose";

const userTemplateSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    templateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Template",
      required: true,
    },
    assignedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

userTemplateSchema.index({ userId: 1, templateId: 1 }, { unique: true });

const UserTemplate = mongoose.models.UserTemplate || mongoose.model("UserTemplate", userTemplateSchema);
export default UserTemplate;

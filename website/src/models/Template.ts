import mongoose from "mongoose";

const templateSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: mongoose.Schema.Types.Mixed, // Allow number or 'Free'
      required: true,
    },
    thumbnailUrls: {
      type: [String],
      required: true,
    },

    demoUrl: {
      type: String,
      required: true,
    },
    features: [
      {
        type: String,
        required: true,
      },
    ],
    techStack: [
      {
        type: String,
        default: [],
      },
    ],
    featured: {
      type: Boolean,
      default: false,
    },
    views: {
      type: Number,
      default: 0,
    },
    downloads: {
      type: Number,
      default: 0,
    },
    lastViewed: {
      type: Date,
      default: Date.now,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    tags: [
      {
        type: String,
        default: [],
      },
    ],
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    downloadUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    bufferCommands: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Template =
  mongoose.models.Template || mongoose.model("Template", templateSchema);

export default Template;

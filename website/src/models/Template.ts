import mongoose from 'mongoose';

const templateSchema = new mongoose.Schema({
  name: {
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
    enum: ['landing-page', 'dashboard', 'ecommerce', 'portfolio', 'blog'],
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  previewUrl: {
    type: String,
    required: true,
  },
  features: [{
    type: String,
    required: true,
  }],
  techStack: [{
    type: String,
    required: true,
  }],
  isFeatured: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
templateSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Template = mongoose.models.Template || mongoose.model('Template', templateSchema);

export default Template; 
import mongoose from 'mongoose';

export interface IOTP {
  email: string;
  otp: string;
  purpose: 'password-reset' | 'email-verification';
  createdAt: Date;
  expiresAt: Date;
}

const otpSchema = new mongoose.Schema<IOTP>({
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  otp: {
    type: String,
    required: true,
  },
  purpose: {
    type: String,
    required: true,
    enum: ['password-reset', 'email-verification'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

// Index that auto-expires documents based on the expiresAt field
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Create compound index to ensure uniqueness per email and purpose
otpSchema.index({ email: 1, purpose: 1 }, { unique: true });

const OTP = mongoose.models.OTP || mongoose.model<IOTP>('OTP', otpSchema);

export default OTP; 
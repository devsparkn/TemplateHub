// utils/otp.ts
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import OTPModel from '@/models/OTP';
import dbConnect from './mongodb';
import dotenv from 'dotenv';

dotenv.config(); // Ensure environment variables are loaded

// Type for OTP purpose
export type OTPPurpose = 'password-reset' | 'email-verification';

// Setup transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: Number(process.env.EMAIL_SERVER_PORT) || 587,
  secure: Number(process.env.EMAIL_SERVER_PORT) === 465,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

// Generate 6-digit OTP
export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Generate token (for links or deep security)
export function generateToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

// Save OTP to DB
export async function createOTP(email: string, purpose: OTPPurpose): Promise<string> {
  await dbConnect();

  const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 mins from now
  const otp = generateOTP();

  await OTPModel.findOneAndDelete({ email, purpose });

  await OTPModel.create({
    email,
    otp,
    purpose,
    expiresAt,
  });

  return otp;
}

// Verify OTP
export async function verifyOTP(email: string, otp: string, purpose: OTPPurpose): Promise<boolean> {
  await dbConnect();

  const record = await OTPModel.findOne({ email, purpose });

  if (!record || new Date() > record.expiresAt) {
    if (record) await OTPModel.deleteOne({ _id: record._id });
    return false;
  }

  const isMatch = record.otp === otp;
  if (isMatch) await OTPModel.deleteOne({ _id: record._id });

  return isMatch;
}

// Send password reset OTP
export async function sendPasswordResetEmail(email: string, otp: string): Promise<void> {
  const message = {
    from: process.env.EMAIL_FROM || 'no-reply@templatehub.com',
    to: email,
    subject: 'Password Reset OTP',
    html: emailTemplate('Password Reset', otp, 'We received a request to reset your password.'),
    text: `Your OTP for password reset is: ${otp}. This OTP is valid for 15 minutes.`,
  };

  await transporter.sendMail(message);
}

// Send verification OTP
export async function sendVerificationEmail(email: string, otp: string): Promise<void> {
  const message = {
    from: process.env.EMAIL_FROM || 'no-reply@templatehub.com',
    to: email,
    subject: 'Email Verification OTP',
    html: emailTemplate('Email Verification', otp, 'Please use the following OTP to verify your email address.'),
    text: `Your OTP for email verification is: ${otp}. This OTP is valid for 15 minutes.`,
  };

  await transporter.sendMail(message);
}

// HTML template
function emailTemplate(title: string, otp: string, message: string): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
      <h2>${title}</h2>
      <p>${message}</p>
      <div style="background: #f5f5f5; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; margin: 20px 0;">
        ${otp}
      </div>
      <p>This OTP is valid for 15 minutes. If you did not request this, please ignore this email.</p>
      <p style="font-size: 12px; color: #999;">This is an automated message. Do not reply.</p>
    </div>
  `;
}

const emailService = {
  generateOTP,
  generateToken,
  createOTP,
  verifyOTP,
  sendPasswordResetEmail,
  sendVerificationEmail,
};

export default emailService;

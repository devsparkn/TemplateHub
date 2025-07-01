import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import UserTemplate from '@/models/UserTemplate';
import Order from '@/models/Order';
import dbConnect from '@/lib/mongodb';
import Stripe from 'stripe';
import { sendPurchaseConfirmationEmail } from '@/lib/email-service';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2025-04-30.basil',
});

type CheckoutItem = {
  templateId: string;
  title: string;
  price: number;
};

export async function POST(req: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const userId = session.user.id;
  const { session_id, items } = await req.json();
  if (!session_id || !items || !Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: 'Missing session_id or items' }, { status: 400 });
  }
  // Verify Stripe session
  let stripeSession;
  try {
    stripeSession = await stripe.checkout.sessions.retrieve(session_id);
    if (stripeSession.payment_status !== 'paid') {
      return NextResponse.json({ error: 'Payment not completed' }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ error: 'Invalid session_id' }, { status: 400 });
  }
  // Assign templates to user
  for (const item of items as CheckoutItem[]) {
    await UserTemplate.updateOne(
      { userId, templateId: item.templateId },
      { $set: { userId, templateId: item.templateId } },
      { upsert: true }
    );
  }
  // Create order record
  const total = (items as CheckoutItem[]).reduce((sum, item) => sum + Number(item.price), 0);
  const order = await Order.create({
    userId,
    items: (items as CheckoutItem[]).map((item) => ({ templateId: item.templateId, title: item.title, price: item.price })),
    total,
    status: 'paid',
    stripeSessionId: session_id,
  }) as typeof Order extends { prototype: infer T } ? T : never;
  // Send purchase confirmation email
  await sendPurchaseConfirmationEmail(session.user.email, items, order._id.toString());
  return NextResponse.json({ success: true });
} 
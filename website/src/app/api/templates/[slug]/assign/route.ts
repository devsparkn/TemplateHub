import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import dbConnect from '@/lib/mongodb';
import UserTemplate from '@/models/UserTemplate';
import Template from '@/models/Template';

export async function POST(req: Request, { params }: { params: { slug: string } }) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ success: false, message: 'Not authenticated' }, { status: 401 });
  }
  const userId = session.user.id;
  const slug = params.slug;
  const template = await Template.findOne({ slug });
  if (!template) {
    return NextResponse.json({ success: false, message: 'Template not found' }, { status: 404 });
  }
  // Only allow free templates
  if (template.price !== 'Free') {
    return NextResponse.json({ success: false, message: 'Only free templates can be assigned this way.' }, { status: 400 });
  }
  // Check if already assigned
  const owned = await UserTemplate.findOne({ userId, templateId: template._id });
  if (owned) {
    return NextResponse.json({ success: true });
  }
  // Assign template
  await UserTemplate.create({ userId, templateId: template._id });
  return NextResponse.json({ success: true });
} 
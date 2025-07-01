import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import dbConnect from '@/lib/mongodb';
import UserTemplate from '@/models/UserTemplate';
import Template from '@/models/Template';

export async function GET() {
  await dbConnect();
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ templates: [] });
  }
  const userId = session.user.id;
  // Get all template IDs owned by the user
  const userTemplates = await UserTemplate.find({ userId });
  const templateIds = userTemplates.map((ut) => ut.templateId);
  // Get template details
  const templates = await Template.find({ _id: { $in: templateIds } });
  return NextResponse.json({ templates });
}

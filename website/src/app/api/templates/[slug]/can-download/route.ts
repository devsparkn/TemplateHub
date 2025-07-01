import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import dbConnect from '@/lib/mongodb';
import UserTemplate from '@/models/UserTemplate';
import Template from '@/models/Template';

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ allowed: false });
  }
  const userId = session.user.id;
  const slug = params.slug;
  const template = await Template.findOne({ slug });
  if (!template) {
    return NextResponse.json({ allowed: false });
  }
  const owned = await UserTemplate.findOne({ userId, templateId: template._id });
  if (!owned) {
    return NextResponse.json({ allowed: false });
  }
  const templateObj = template.toObject();
  templateObj.downloadUrl = template.downloadUrl;
  return NextResponse.json({ allowed: true, template: templateObj });
}

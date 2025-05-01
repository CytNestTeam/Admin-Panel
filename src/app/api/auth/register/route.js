import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  const body = await req.json();
  const { email, password, roleId } = body;

  if (!email || !password || !roleId) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, password: hashedPassword, roleId }
  });

  return NextResponse.json(user);
}

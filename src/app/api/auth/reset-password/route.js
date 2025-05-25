import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const { token, password } = await req.json();

    // Check if token is valid and not expired
    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
    }

    // Hash password (make sure you have bcrypt installed)
    const hashedPassword = await bcrypt.hash(password, 10);
    // Update password and clear reset token
     await prisma.user.update({
         where: { id: user.id },
         data: {
             password: hashedPassword,
             resetToken: null,
             resetTokenExpiry: null,
            },
        });
        return NextResponse.json({ message: 'Password has been reset' }, { status: 200 });

  } catch (error) {
    console.error('Reset Password Error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

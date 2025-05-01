import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
  const { email } = await req.json();

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  await transporter.sendMail({
    from: `"Support" <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'Password Reset',
    text: 'Reset instructions here...',
    html: '<p>Reset instructions here...</p>'
  });

  return NextResponse.json({ message: 'Email sent if user exists.' });
}

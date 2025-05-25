// File: src/app/api/auth/forgot-password/route.js
import prisma from '@/lib/prisma';
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";
import { addMinutes } from "date-fns";

const transporter = nodemailer.createTransport({
  host: 'tournamenthaven.com', // use your real SMTP server
  port: Number(process.env.SMTP_PORT), // 587 or 465
  secure: process.env.SMTP_PORT === '465', // true for 465, false for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});


export async function POST(req) {
  // try {
    const { email } = await req.json();

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    const resetToken = uuidv4();
    const resetTokenExpiry = addMinutes(new Date(), 3); // Token valid for 1 hour

    await prisma.user.update({
      where: { email },
      data: { resetToken, resetTokenExpiry },
    });

    const resetLink = `${process.env.APP_URL || "cytnest.com"}/reset-password/${resetToken}`;

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: "Password Reset Request",
      text: `Click the link to reset your password: ${resetLink}`,
    });

    return new Response(JSON.stringify({ message: "Password reset link sent" }), { status: 200 });
  // } catch (error) {
  //   console.error(error);
  //   return new Response(JSON.stringify({ error: "Error sending reset link" }), { status: 500 });
  // }
}

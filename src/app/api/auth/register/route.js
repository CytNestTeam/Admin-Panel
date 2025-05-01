// File: src/app/api/register/route.js
import prisma from '@/lib/prisma';
import bcrypt from "bcrypt";


export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password, roleId } = body;

    if (!email || !password || !roleId) {
      return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return new Response(JSON.stringify({ error: "Email already registered" }), { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        roleId,
      },
    });

    return new Response(JSON.stringify({ message: "User registered", user }), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Registration failed" }), { status: 500 });
  }
}

// File: src/app/api/register/route.js
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password, roleId } = body;

    if (!email || !password || !roleId) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
      });
    }

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: "Invalid email format." }), {
        status: 400,
      });
    }
    // Password length check
    if (password.length < 8) {
      return new Response(
        JSON.stringify({
          error: "Password must be at least 8 characters long.",
        }),
        { status: 400 }
      );
    }

    // Check if role exists
    const roleIdInt = parseInt(roleId, 10);
    if (isNaN(roleIdInt)) {
      return new Response(JSON.stringify({ error: "Invalid roleId format" }), {
        status: 400,
      });
    }
    const roleExists = await prisma.role.findUnique({
      where: { id: roleIdInt },
    });
    if (!roleExists) {
      return new Response(JSON.stringify({ error: "Invalid role selected." }), {
        status: 400,
      });
    }
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return new Response(
        JSON.stringify({ error: "Email already registered." }),
        { status: 409 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        roleId,
      },
    });
    return new Response(
      JSON.stringify({
        message: "User registered",
        body,
        existingUser,
        hashedPassword,
        user,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Registration failed" }), {
      status: 500,
    });
  }
}

// File: src/app/api/roles/route.js
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const roles = await prisma.role.findMany({ select: { id: true, name: true } });
    return new Response(JSON.stringify({ roles }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch roles" }), { status: 500 });
  }
}

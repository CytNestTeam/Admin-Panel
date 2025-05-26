// File: src/app/api/users/route.js
import prisma from '@/lib/prisma';


export async function GET() {
  try {
    const users = await prisma.users.findMany({ select: { id: true, email: true } });
    return new Response(JSON.stringify({ users }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch roles" }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    const {q, page} = await req.json();
    // const { email, password, roleId } = body;
    const searchString = new RegExp(q, "i");

  const ITEM_PER_PAGE = 2;
  const count = await prisma.user.count({
     
  });
    const users = await prisma.user.findMany({ select: { id: true, email: true },  skip: ITEM_PER_PAGE * (page - 1),
    take: ITEM_PER_PAGE, });
  
    return new Response(
      JSON.stringify({
        message: "fetching user",
        q, page,
        users,
        count
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "fetching user failed" }), {
      status: 500,
    });
  }
}

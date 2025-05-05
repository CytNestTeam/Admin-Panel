import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // adjust to your NextAuth config
import prisma from "@/lib/prisma";

export async function GET(req) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      userpermission: { include: { permission: true } },
      role: {
        include: {
          rolepermission: { include: { permission: true } },
        },
      },
    },
  });

  const userPermissions = user.userpermission.map((up) => up.permission.name);
  const rolePermissions = user.role.rolepermission.map(
    (rp) => rp.permission.name
  );

  const effectivePermissions = userPermissions.length > 0 ? userPermissions : rolePermissions;

  return new Response(JSON.stringify({ permissions: effectivePermissions }), {
    status: 200,
  });
}

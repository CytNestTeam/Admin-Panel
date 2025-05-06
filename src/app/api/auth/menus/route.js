import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // adjust to your NextAuth config
import prisma from "@/lib/prisma";

export async function GET(req) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id || !session.user?.roleId ) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const userId = session.user?.id;
  const userRoleId = session.user?.roleId;
  const userPermissions = await prisma.userpermission.findMany({
    where: { userId },
    include: { permission: { include: { page_apis: { include: { pages: { include: { menus: true } } } } } } }
  });

  const rolePermissions = await prisma.rolepermission.findMany({
    where: { roleId: userRoleId }, // Get from user
    include: { permission: { include: { page_apis: { include: { pages: { include: { menus: true } } } } } } }
  });
  const combinedPermissions = [...userPermissions, ...rolePermissions];
 
  const sidebarMap = {};

  for (const perm of combinedPermissions) {
    const pages = perm?.permission?.page_apis?.pages;
  
    if (!pages) continue; // Skip if pages is null or undefined
  
    const { menus : menu , id: page_id, name, route } = pages;
  
    if (!menu || !menu.name) continue; // Additional safety check
  
    if (!sidebarMap[menu.name]) {
      sidebarMap[menu.name] = [];
    }
  
    const existingPage = sidebarMap[menu.name].find(p => p.route === route);
  
    if (existingPage) {
      existingPage.actions.push(perm.permission.page_apis.action);
    } else {
      sidebarMap[menu.name].push({
        name,
        route,
        actions: [perm.permission.page_apis.action],
      });
    }
  }
  

  // Format to array
  return new Response(JSON.stringify( Object.entries(sidebarMap).map(([menu, pages]) => ({ menu, pages }))), {
    status: 200,
  });
}

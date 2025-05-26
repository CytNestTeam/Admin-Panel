import prisma from "@/lib/prisma";

export const fetchUsers = async (q, page) => {
  const searchString = new RegExp(q, "i");

  const ITEM_PER_PAGE = 2;

  try {
    const count = await prisma.user.count({
     
    });
    const users = await prisma.user.findMany({
      skip: ITEM_PER_PAGE * (page - 1),
      take: ITEM_PER_PAGE,
    });

    return { count, users };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch users!");
  }
};

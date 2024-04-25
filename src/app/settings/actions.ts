"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { UpdateProfileValues, updateProfileSchema } from "@/lib/validation";
import { revalidatePath } from "next/cache";

// To learn more about server actions, watch my YT tutorial: https://www.youtube.com/watch?v=XD5FpbVpWzk

export async function updateProfile(values: UpdateProfileValues) {
  //Get the currently authenticated user
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("User not found, please sign in.");
  }

  const { name } = updateProfileSchema.parse(values);

  // Update user
  await prisma.user.update({
    where: { id: userId },
    data: { name },
  });

  revalidatePath("/");
}

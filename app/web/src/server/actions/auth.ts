"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().optional(),
  role: z.enum(["employee", "employer"]),
});

export async function register(data: z.infer<typeof registerSchema>) {
  try {
    const { email, password, name, role } = registerSchema.parse(data);

    // Check if user already exists
    const existingUser = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, email),
    });

    if (existingUser) {
      throw new Error("User already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await db.insert(users).values({
      id: nanoid(),
      email,
      name,
      password: hashedPassword,
      role,
    });

    return { success: true };
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
}

export async function updatePassword(userId: string, newPassword: string) {
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db.update(users)
      .set({ password: hashedPassword })
      .where(eq(users.id, userId));
    return { success: true };
  } catch (error) {
    console.error("Password update error:", error);
    throw error;
  }
}

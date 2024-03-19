import db from "@/lib/db";
import { users } from "@/lib/db/schema";
import { auth, currentUser } from "@clerk/nextjs";
import { error } from "console";
import { eq, ne } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth();
    const currentUserData = await currentUser();
    if (!currentUserData) {
      return Response.json({ error: "User data not found" }, { status: 404 });
    }
    const { firstName, lastName } = currentUserData;
    const dbuser = await db
      .select()
      .from(users)
      .where(eq(users.user_id, userId!));

    if (!dbuser.length) {
      await db
        .insert(users)
        .values({ user_id: userId!, name: firstName + " " + lastName });
    } else {
      console.log("userFound");
    }

    return Response.json({});
  } catch (error) {
    console.error("Error:", error);

    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { userId } = auth();
    const allUsers = await db
      .select()
      .from(users)
      .where(ne(users.user_id, userId!));
    return Response.json({ users: allUsers });
  } catch (error) {
    console.error("Error:", error);

    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

import { auth } from "@clerk/nextjs";
import * as schema from "@/lib/db/schema";
import { sql } from "@/lib/db";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
const db = drizzle(sql, { schema });

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    console.log(params.id);
    const user = await db.query.users.findMany({
      where: eq(schema.users.user_id, params.id),
      with: {
        availabilty: true,
        prefrence: true,
      },
    });

    return Response.json(user[0]);
  } catch (error) {
    console.error("Error:", error);

    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

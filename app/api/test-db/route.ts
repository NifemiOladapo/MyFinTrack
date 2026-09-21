import { db } from "@/db";
import { holdings } from "@/db/schema";

export async function GET() {
  const result = await db.select().from(holdings);

  return Response.json(result);
}
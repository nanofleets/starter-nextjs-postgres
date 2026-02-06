import { db } from "@/db";
import { status } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Simple query to verify database connection
    const result = await db.select().from(status).limit(1);

    return NextResponse.json({
      status: "ok",
      database: result.length > 0 ? "connected" : "connected (empty)",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        database: "disconnected",
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

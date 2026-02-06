import { db } from "@/db";
import { status } from "@/db/schema";

// Force dynamic rendering
export const dynamic = "force-dynamic";

export default async function Home() {
  let dbStatus = "checking...";

  try {
    const result = await db.select().from(status).limit(1);
    dbStatus = result.length > 0 ? "connected" : "connected (no data)";
  } catch (error) {
    console.error("Database error on home page:", error);
    // Show the full error for debugging
    dbStatus =
      "error: " + JSON.stringify(error, Object.getOwnPropertyNames(error));
  }

  return (
    <main style={{ padding: "2rem", fontFamily: "system-ui" }}>
      <h1>Next.js + Postgres Starter</h1>
      <p>
        Database status: <strong>{dbStatus}</strong>
      </p>
      <p>
        <a
          href="/api/health"
          style={{ color: "blue", textDecoration: "underline" }}
        >
          /api/health
        </a>
      </p>
    </main>
  );
}

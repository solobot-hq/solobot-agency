import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import db from "@/lib/db";

export async function GET() {
  try {
    // 1. Verify the user is logged in
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    /**
     * ✅ FIX: Runtime check for database connection and model
     * If DATABASE_URL is missing or Task model isn't generated, return []
     * This prevents the "Cannot read properties of undefined" error
     */
    if (!db || !db.task) {
      console.error("CRITICAL: Database connection or 'Task' model is missing.");
      return NextResponse.json([]); 
    }

    // 2. Define the "start of today" to filter tasks
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    // 3. Query Neon for tasks created today
    const tasks = await db.task.findMany({
      where: {
        // Note: Ensure your schema uses 'userId' and not 'clerkId' for tasks
        userId: userId,
        createdAt: {
          gte: startOfToday,
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // 4. Return the data as JSON
    return NextResponse.json(tasks);
  } catch (error) {
    console.error("API_ERROR_TASKS:", error);
    
    /** * ✅ FALLBACK: Return an empty array so the dashboard UI doesn't crash 
     * even if there is a Prisma or Connection error.
     */
    return NextResponse.json([]); 
  }
}
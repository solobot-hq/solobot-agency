import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import db from "@/lib/db"; // ✅ Use the standard singleton instance

export async function GET() {
  try {
    /** * ✅ STEP 1: Await auth() 
     * In Next.js 16, auth() is asynchronous. Without 'await', 
     * userId will be undefined or a promise object, triggering a 401.
     */
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    /** * ✅ STEP 2: Safety check 
     * Ensures the database connection is established before querying.
     */
    if (!db || !db.activity) {
      console.error("Prisma client or Activity model not available");
      return NextResponse.json(
        { error: "Database not initialized" },
        { status: 500 }
      );
    }

    // 3. Fetch latest activity for this user
    const activities = await db.activity.findMany({
      where: {
        userId: userId, // matches Activity.userId in schema
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    });

    return NextResponse.json(activities);
  } catch (error) {
    console.error("ACTIVITY_API_ERROR:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
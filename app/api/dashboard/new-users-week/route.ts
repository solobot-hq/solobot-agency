import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import db from "@/lib/db";

export async function GET() {
  try {
    // 1. Verify the user is authenticated
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Calculate the date for 7 days ago
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // 3. Query Neon for users created in the last week
    const newUsers = await db.user.count({
      where: {
        createdAt: {
          gte: sevenDaysAgo,
        },
      },
    });

    /**
     * ✅ Note: Dashboards often expect an array of daily counts 
     * to draw a line chart. For now, we return the total count.
     */
    return NextResponse.json({ count: newUsers });
  } catch (error) {
    console.error("API_ERROR_NEW_USERS:", error);
    
    // Fallback to 0 so the UI doesn't break if the table is empty
    return NextResponse.json({ count: 0 });
  }
}
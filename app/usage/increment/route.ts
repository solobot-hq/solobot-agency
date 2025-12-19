import { NextResponse } from "next/server";
import { getDbUser } from "@/lib/auth";
import { incrementUsage } from "@/lib/usage";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    const user = await getDbUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const updated = await incrementUsage(user.id);

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Increment Usage Error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

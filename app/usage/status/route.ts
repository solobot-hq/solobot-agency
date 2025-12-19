import { NextResponse } from "next/server";
import { getDbUser } from "@/lib/auth";
import { getUsageForUser } from "@/lib/usage";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const user = await getDbUser();
    if (!user) return new NextResponse("Unauthorized", { status: 401 });

    const usage = await getUsageForUser(user.id);

    return NextResponse.json(usage);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
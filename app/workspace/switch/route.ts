import { NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { workspaceId } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!workspaceId) {
      return new NextResponse("Workspace ID required", { status: 400 });
    }

    const client = await clerkClient();

    // Update Clerk User Metadata to persist preference across sessions/devices
    await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        activeWorkspaceId: workspaceId
      }
    });

    return NextResponse.json({ success: true, workspaceId });
  } catch (error) {
    console.error("[WORKSPACE_SWITCH_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
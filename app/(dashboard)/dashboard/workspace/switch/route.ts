import { NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';

export async function POST(req: Request) {
  try {
    // ✅ Auth compatibility for Next.js 16/Clerk v5+
    const { userId } = await auth();
    
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    // ✅ Extract Agent-specific data from the Phase 7 Modal
    const { agentId, templateName } = body;

    if (!agentId) {
      return new NextResponse("Agent ID required", { status: 400 });
    }

    // ✅ Initialize Clerk Client
    const client = await clerkClient();

    // ✅ Persist deployment state in Metadata
    // This allows the UI to show the "Active Plan" even before a DB is connected
    await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        lastDeployedAgent: agentId,
        lastTemplateName: templateName,
        deploymentTimestamp: new Date().toISOString()
      }
    });

    // ✅ LOGIC PLACEHOLDER: Connect to your AI backend/DB here in Phase 9
    console.log(`User ${userId} initialized deployment for: ${templateName}`);

    return NextResponse.json({ 
      success: true, 
      agentId,
      message: `${templateName} is being configured.`
    });
  } catch (error) {
    console.error("[AGENT_DEPLOYMENT_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
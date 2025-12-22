import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { generateEmailSchema } from "@/lib/validators";
import { getUsageForUser, incrementUsage, FREE_LIMIT } from "@/lib/usage";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const validation = generateEmailSchema.safeParse(body);

    if (!validation.success) {
      return new NextResponse("Invalid request data", { status: 400 });
    }

    // Check usage limits
    const usage = await getUsageForUser(userId);

    if (usage.count >= FREE_LIMIT) {
      return NextResponse.json(
        { error: "UPGRADE_REQUIRED", message: "You have reached your plan limit." },
        { status: 403 }
      );
    }

    // Mock AI Generation (Simulated delay)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // ✅ FIX: Match the schema property names (context & tone)
    // The previous error was because 'topic' and 'style' didn't exist
    const topic = validation.data.context; 
    const style = validation.data.tone || "professional";

    const generatedEmail = `Subject: Quick question regarding ${topic}

Hi there,

I noticed you're looking into ${topic}. Based on your interest in ${style} strategies, I thought you might find our approach helpful.

We specialize in helping businesses achieve their goals without the usual friction. 

Would you be open to a brief 10-minute chat next week?

Best,
[Your Name]`;

    // Save log
    await prisma.emailLog.create({
      data: {
        userId: userId,
        text: generatedEmail,
      }
    });

    // Increment usage
    await incrementUsage(userId);

    return NextResponse.json({ 
      email: generatedEmail,
      remaining: FREE_LIMIT - (usage.count + 1)
    });

  } catch (error) {
    console.error("Generate Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
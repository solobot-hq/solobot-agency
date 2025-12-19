import { NextResponse } from "next/server";
import { getDbUser } from "@/lib/auth";
import { generateEmailSchema } from "@/lib/validators";
import { getUsageForUser, incrementUsage } from "@/lib/usage";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const user = await getDbUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const validation = generateEmailSchema.safeParse(body);

    if (!validation.success) {
      return new NextResponse("Invalid request data", { status: 400 });
    }

    // Check usage limits
    const usage = await getUsageForUser(user.id);
    
    if (usage.used >= usage.limit) {
      return NextResponse.json(
        { error: "UPGRADE_REQUIRED", message: "You have reached your plan limit." },
        { status: 403 }
      );
    }

    // Mock AI Generation (Simulated delay)
    // In a real app, this is where you'd call OpenAI
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const generatedEmail = `Subject: Quick question regarding ${validation.data.topic}

Hi there,

I noticed you're looking into ${validation.data.topic}. Based on your interest in ${validation.data.style} strategies, I thought you might find our approach helpful.

We specialize in helping businesses achieve their goals without the usual friction. 

Would you be open to a brief 10-minute chat next week?

Best,
[Your Name]`;

    // Save log
    await prisma.emailLog.create({
      data: {
        userId: user.id,
        text: generatedEmail,
      }
    });

    // Increment usage
    await incrementUsage(user.id);

    return NextResponse.json({ 
      email: generatedEmail,
      remaining: usage.limit - (usage.used + 1)
    });

  } catch (error) {
    console.error("Generate Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
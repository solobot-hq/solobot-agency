import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import OpenAI from "openai";
import { getUserSubscriptionStatus } from "@/lib/subscription";
import { getUsage, incrementUsage, FREE_LIMIT } from "@/lib/usage";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const ADMIN_EMAILS = ["solobotagency@gmail.com"];

export async function POST(req: Request) {
  const { userId } = auth();
  const user = await currentUser();
  if (!userId || !user) return new NextResponse("Unauthorized", { status: 401 });

  const { messages, mode, leadContext } = await req.json();
  const email = user.emailAddresses[0]?.emailAddress?.toLowerCase() || "";

  const isAdmin = ADMIN_EMAILS.includes(email);
  const subscription = await getUserSubscriptionStatus(userId);
  const usage = await getUsage(userId);
  const isPremium = isAdmin || subscription.isPremium;

  if (!isPremium && mode !== "Smart Reply Generator") {
    return NextResponse.json({}, { status: 403 });
  }

  if (!isPremium && usage.count >= FREE_LIMIT) {
    return NextResponse.json({}, { status: 402 });
  }

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: `Return JSON { reply, strategy }. Context: ${JSON.stringify(
          leadContext
        )}`,
      },
      ...messages,
    ],
    response_format: { type: "json_object" },
  });

  if (!isPremium) await incrementUsage(userId);

  return NextResponse.json(
    JSON.parse(response.choices[0].message.content || "{}")
  );
}

'use server'

import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";

export async function getDashboardStats() {
  const user = await getAuthUser();
  if (!user) return null;

  // 1. Get total counts
  const [botCount, activityCount] = await Promise.all([
    prisma.bot.count({ where: { userId: user.id } }),
    prisma.activity.count({ where: { userId: user.id } })
  ]);

  // 2. Fetch last 7 days of activity for the chart
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const rawActivities = await prisma.activity.findMany({
    where: {
      userId: user.id,
      createdAt: { gte: sevenDaysAgo }
    },
    select: { createdAt: true }
  });

  // 3. Group by date for Recharts format: [{ date: 'Jan 21', count: 5 }]
  const chartData = rawActivities.reduce((acc: any, curr) => {
    const date = curr.createdAt.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
    const existing = acc.find((item: any) => item.date === date);
    if (existing) existing.count++;
    else acc.push({ date, count: 1 });
    return acc;
  }, []);

  return { botCount, activityCount, chartData };
}
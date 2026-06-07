import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      // For demo purposes, if no session, return dummy data or 401
      // Since the user is testing, returning zeros is safer
      return NextResponse.json({
        completedBooks: 0,
        readingHours: 0,
        streak: 0,
        activeBooks: 0
      });
    }

    const userId = (session.user as any).id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        streakCount: true,
        totalHours: true,
      }
    });

    const progress = await prisma.readingProgress.findMany({
      where: { userId },
    });

    const completedBooks = progress.filter(p => p.percentage === 100).length;
    const activeBooks = progress.filter(p => p.percentage > 0 && p.percentage < 100).length;

    return NextResponse.json({
      completedBooks,
      readingHours: user?.totalHours || 0,
      streak: user?.streakCount || 0,
      activeBooks
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

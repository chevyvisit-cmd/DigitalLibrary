import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const bookId = searchParams.get("bookId");

    const userId = (session.user as any).id;

    if (!bookId) {
      const allProgress = await prisma.readingProgress.findMany({
        where: { userId },
        include: {
          book: {
            include: {
              category: true,
            },
          },
        },
        orderBy: {
          updatedAt: "desc",
        },
      });
      return NextResponse.json(allProgress);
    }

    const progress = await prisma.readingProgress.findUnique({
      where: {
        userId_bookId: {
          userId,
          bookId,
        },
      },
    });

    return NextResponse.json(progress || { percentage: 0, lastChapterId: null });
  } catch (error) {
    console.error("Error fetching progress:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { bookId, percentage, lastChapterId } = body;

    if (!bookId) {
      return NextResponse.json(
        { error: "Book ID is required" },
        { status: 400 }
      );
    }

    const userId = (session.user as any).id;

    // Update progress
    const progress = await prisma.readingProgress.upsert({
      where: {
        userId_bookId: {
          userId,
          bookId,
        },
      },
      update: {
        percentage: typeof percentage === 'number' ? percentage : undefined,
        lastChapterId: lastChapterId || undefined,
      },
      create: {
        userId,
        bookId,
        percentage: typeof percentage === 'number' ? percentage : 0,
        lastChapterId: lastChapterId || null,
      },
    });

    // Update user activity and streak
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { lastActiveAt: true, streakCount: true }
    });

    if (user) {
      const now = new Date();
      const lastActive = user.lastActiveAt ? new Date(user.lastActiveAt) : null;
      let newStreak = user.streakCount || 0;

      if (!lastActive) {
        newStreak = 1;
      } else {
        const diffInDays = Math.floor((now.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24));
        if (diffInDays === 1) {
          newStreak += 1;
        } else if (diffInDays > 1) {
          newStreak = 1;
        }
      }

      await prisma.user.update({
        where: { id: userId },
        data: {
          lastActiveAt: now,
          streakCount: newStreak,
          // Increment totalHours slightly as a simulation
          totalHours: { increment: 0.1 } 
        }
      });
    }

    return NextResponse.json(progress);
  } catch (error) {
    console.error("Error updating progress:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

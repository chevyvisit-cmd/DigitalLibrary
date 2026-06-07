import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
// Import authOptions if needed, but for now I'll use a simple approach
// Assuming auth is handled by next-auth

export async function GET() {
  try {
    const session = await getServerSession();
    
    // For now, if no session, just return empty or error. 
    // In a real app, you'd filter by userId.
    const notifications = await prisma.notification.findMany({
      where: {
        isRead: false,
        // user: { email: session?.user?.email } // Uncomment when session is fully set up
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, message, userId, type } = body;

    const notification = await prisma.notification.create({
      data: {
        title,
        message,
        userId,
        type: type || 'info'
      }
    });

    return NextResponse.json(notification);
  } catch (error) {
    console.error("Error creating notification:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message, sessionId, history } = await req.json();

    const response = await fetch('https://muhammad-bahjat-backend-service-production.up.railway.app/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        session_id: sessionId,
        history: history || []
      })
    });

    const data = await response.json();
    
    return NextResponse.json({
      response: data.response,
      history: data.history
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to connect to AI service" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { spawn } from "child_process";
import path from "path";

export async function POST(req: Request) {
  try {
    const { message, sessionId, history } = await req.json();

    return new Promise((resolve, reject) => {
      const pythonProcess = spawn("python", [
        path.resolve(process.cwd(), "app/api/chat/app.py"),
        message,
        sessionId,
        JSON.stringify(history || []),
      ]);

      let responseData = "";

      pythonProcess.stdout.on("data", (data) => {
        responseData += data.toString();
      });

      pythonProcess.stderr.on("data", (data) => {
        console.error("Python Error:", data.toString());
      });

      pythonProcess.on("close", (code) => {
        try {
          console.log("Raw Python response:", responseData);
          const parsedResponse = JSON.parse(responseData.trim());
          console.log("Parsed response:", parsedResponse);
          
          if (parsedResponse.error) {
            resolve(
              NextResponse.json({
                error: parsedResponse.error,
                history: parsedResponse.history || []
              })
            );
          } else {
            resolve(
              NextResponse.json({
                response: parsedResponse.response,
                history: parsedResponse.history || []
              })
            );
          }
        } catch (err) {
          console.error("Error parsing AI response:", err);
          reject(
            NextResponse.json({ error: "Invalid AI response format" }, { status: 500 })
          );
        }
      });
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Server error while processing AI request" },
      { status: 500 }
    );
  }
}

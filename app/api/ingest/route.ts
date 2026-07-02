import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log("Ingested data:", data);

    // ALWAYS return a response in Next.js Route Handlers
    return NextResponse.json({
      success: true,
      message: "Data received successfully",
      data,
    });
  } catch (error) {
    console.error("Ingestion handler error:", error);
    return NextResponse.json(
      { success: false, message: "Invalid request body" },
      { status: 400 }
    );
  }
}

import { NextResponse } from 'next/server';

// This is a simple GET request handler.
export async function GET() {
  console.log("--- API Route '/api/hello' was successfully reached! ---");
  return NextResponse.json({ message: "Hello from the API! Routing is working." });
}
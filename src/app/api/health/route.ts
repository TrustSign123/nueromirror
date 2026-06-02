import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    status: "ok",
    service: "neuromirror-web",
    timestamp: new Date().toISOString()
  });
}

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { dossierId, comment } = await request.json();
    if (!dossierId || !comment) {
      return NextResponse.json({ error: "Missing dossierId or comment" }, { status: 400 });
    }
    return NextResponse.json({ success: true, dossierId, comment });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

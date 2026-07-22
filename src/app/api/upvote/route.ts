import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: "Missing dossier id" }, { status: 400 });
    }
    return NextResponse.json({ success: true, id });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

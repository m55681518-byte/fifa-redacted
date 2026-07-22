import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, mediaUrl, year } = body;

    if (!title || !description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newDossier = {
      id: `SEC-${year || "XXXX"}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
      year: year || null,
      title,
      description,
      mediaUrl: mediaUrl || null,
      upvotes: 0,
      comments: [],
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json({ success: true, dossier: newDossier }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

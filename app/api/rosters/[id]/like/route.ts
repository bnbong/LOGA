import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import type { CommunityRoster } from "@/lib/community-storage";

const DATA_FILE = path.join(process.cwd(), "data", "community-rosters.json");

// POST /api/rosters/[id]/like
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await request.json();
    const rosterId = params.id;

    const data = await fs.readFile(DATA_FILE, "utf-8");
    const rosters: CommunityRoster[] = JSON.parse(data);

    const roster = rosters.find((r) => r.id === rosterId);

    if (!roster) {
      return NextResponse.json({ error: "Roster not found" }, { status: 404 });
    }

    // 중복 좋아요 방지
    if (!roster.likedBy) roster.likedBy = [];

    if (roster.likedBy.includes(userId)) {
      return NextResponse.json({ error: "Already liked" }, { status: 400 });
    }

    roster.likedBy.push(userId);
    roster.likes = (roster.likes || 0) + 1;

    await fs.writeFile(DATA_FILE, JSON.stringify(rosters, null, 2));

    return NextResponse.json({ success: true, likes: roster.likes });
  } catch (error) {
    console.error("Failed to like roster:", error);
    return NextResponse.json(
      { error: "Failed to like roster" },
      { status: 500 }
    );
  }
}

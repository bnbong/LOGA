import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import type { CommunityRoster } from "@/lib/community-storage";

// 데이터 파일 경로 (서버 파일시스템)
const DATA_FILE = path.join(process.cwd(), "data", "community-rosters.json");

// 파일 초기화
async function ensureDataFile() {
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify([]));
  }
}

// GET /api/rosters - 모든 로스터 가져오기
export async function GET() {
  try {
    await ensureDataFile();
    const data = await fs.readFile(DATA_FILE, "utf-8");
    const rosters: CommunityRoster[] = JSON.parse(data);

    // 최신순 정렬
    rosters.sort((a, b) => b.sharedAt - a.sharedAt);

    return NextResponse.json({ rosters });
  } catch (error) {
    console.error("Failed to read rosters:", error);
    return NextResponse.json(
      { error: "Failed to load rosters" },
      { status: 500 }
    );
  }
}

// POST /api/rosters - 새 로스터 저장
export async function POST(request: Request) {
  try {
    const newRoster: CommunityRoster = await request.json();

    await ensureDataFile();
    const data = await fs.readFile(DATA_FILE, "utf-8");
    const rosters: CommunityRoster[] = JSON.parse(data);

    // 최대 100개까지만 저장
    rosters.unshift(newRoster);
    if (rosters.length > 100) {
      rosters.pop();
    }

    await fs.writeFile(DATA_FILE, JSON.stringify(rosters, null, 2));

    return NextResponse.json({ success: true, roster: newRoster });
  } catch (error) {
    console.error("Failed to save roster:", error);
    return NextResponse.json(
      { error: "Failed to save roster" },
      { status: 500 }
    );
  }
}

// 캐싱 비활성화 (실시간 데이터)
export const revalidate = 0;

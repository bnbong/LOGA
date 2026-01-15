import { NextResponse } from "next/server";
import { getAllPlayers, getPlayersByPosition } from "@/data/players";
import type { Position } from "@/types";

// GET /api/players
// GET /api/players?position=TOP
// GET /api/players?isWinner=true
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const position = searchParams.get("position") as Position | null;
  const isWinner = searchParams.get("isWinner") === "true";
  const year = searchParams.get("year");

  let players = getAllPlayers();

  // 필터링
  if (position) {
    players = players.filter((p) => p.position === position);
  }

  if (isWinner) {
    players = players.filter((p) => p.isWinner === true);
  }

  if (year) {
    players = players.filter((p) => p.year === parseInt(year));
  }

  return NextResponse.json({
    players,
    count: players.length,
  });
}

// 1시간 캐싱 (Next.js 내장 기능)
export const revalidate = 3600;

// Edge Runtime 사용 (선택사항 - 더 빠름)
// export const runtime = 'edge';

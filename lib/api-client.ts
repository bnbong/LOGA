// API 클라이언트 - 클라이언트 사이드에서 직접 데이터 사용

import type { Player, Position } from "@/types";
import type { CommunityRoster } from "@/lib/community-storage";
import { getAllPlayers } from "@/data/players";

// 선수 데이터 API - 직접 필터링
export async function fetchPlayers(filters?: {
  position?: Position;
  isWinner?: boolean;
  year?: number;
}): Promise<{ players: Player[]; count: number }> {
  let players = getAllPlayers();

  // 필터링
  if (filters?.position) {
    players = players.filter((p) => p.position === filters.position);
  }

  if (filters?.isWinner !== undefined) {
    players = players.filter((p) => p.isWinner === filters.isWinner);
  }

  if (filters?.year) {
    players = players.filter((p) => p.year === filters.year);
  }

  return { players, count: players.length };
}

// 커뮤니티 로스터 API - Firebase 직접 사용 (community-storage-v2.ts)
// 이 함수들은 더 이상 사용되지 않음 - community-storage-v2.ts를 직접 사용하세요
export async function fetchCommunityRosters() {
  throw new Error("Use community-storage-v2.ts directly");
}

export async function saveCommunityRoster(roster: CommunityRoster) {
  throw new Error("Use community-storage-v2.ts directly");
}

export async function likeRoster(rosterId: string, userId: string) {
  throw new Error("Use community-storage-v2.ts directly");
}

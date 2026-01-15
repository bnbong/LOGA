// API 클라이언트 - 서버 API 호출용

import type { Player, Position } from "@/types";
import type { CommunityRoster } from "@/lib/community-storage";

const API_BASE = "/api";

// 선수 데이터 API
export async function fetchPlayers(filters?: {
  position?: Position;
  isWinner?: boolean;
  year?: number;
}) {
  const params = new URLSearchParams();

  if (filters?.position) params.append("position", filters.position);
  if (filters?.isWinner !== undefined)
    params.append("isWinner", String(filters.isWinner));
  if (filters?.year) params.append("year", String(filters.year));

  const response = await fetch(`${API_BASE}/players?${params}`);

  if (!response.ok) {
    throw new Error("Failed to fetch players");
  }

  return response.json() as Promise<{ players: Player[]; count: number }>;
}

// 커뮤니티 로스터 API
export async function fetchCommunityRosters() {
  const response = await fetch(`${API_BASE}/rosters`, {
    cache: "no-store", // 항상 최신 데이터
  });

  if (!response.ok) {
    throw new Error("Failed to fetch rosters");
  }

  return response.json() as Promise<{ rosters: CommunityRoster[] }>;
}

export async function saveCommunityRoster(roster: CommunityRoster) {
  const response = await fetch(`${API_BASE}/rosters`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(roster),
  });

  if (!response.ok) {
    throw new Error("Failed to save roster");
  }

  return response.json();
}

export async function likeRoster(rosterId: string, userId: string) {
  const response = await fetch(`${API_BASE}/rosters/${rosterId}/like`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to like roster");
  }

  return response.json();
}

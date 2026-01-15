import { UserRoster } from "@/types";

export interface CommunityRoster extends UserRoster {
  authorName: string;
  likes: number;
  likedBy?: string[];
  comments: Comment[];
  sharedAt: number;
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: number;
}

const STORAGE_KEY = "lol-roster-community";
const USER_NAME_KEY = "lol-roster-username";

// 커뮤니티 로스터 저장
export function saveToCommunity(
  roster: UserRoster,
  authorName: string
): CommunityRoster {
  const communityRoster: CommunityRoster = {
    ...roster,
    authorName,
    likes: 0,
    comments: [],
    sharedAt: Date.now(),
  };

  const existingRosters = getCommunityRosters();
  existingRosters.unshift(communityRoster); // 최신순

  // 최대 100개까지 저장
  if (existingRosters.length > 100) {
    existingRosters.pop();
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(existingRosters));
  return communityRoster;
}

// 커뮤니티 로스터 가져오기
export function getCommunityRosters(): CommunityRoster[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to load community rosters:", error);
    return [];
  }
}

// 좋아요 추가
export function addLike(rosterId: string): void {
  const rosters = getCommunityRosters();
  const roster = rosters.find((r) => r.id === rosterId);

  if (roster) {
    roster.likes += 1;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rosters));
  }
}

// 댓글 추가
export function addComment(
  rosterId: string,
  author: string,
  content: string
): void {
  const rosters = getCommunityRosters();
  const roster = rosters.find((r) => r.id === rosterId);

  if (roster) {
    const comment: Comment = {
      id: Date.now().toString(),
      author,
      content,
      timestamp: Date.now(),
    };

    roster.comments.push(comment);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rosters));
  }
}

// 사용자 이름 저장/가져오기
export function saveUserName(name: string): void {
  localStorage.setItem(USER_NAME_KEY, name);
}

export function getUserName(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(USER_NAME_KEY) || "";
}

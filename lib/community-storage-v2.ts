import { UserRoster } from "@/types";

export interface CommunityRoster extends UserRoster {
  authorName: string;
  likes: number;
  likedBy: string[]; // 좋아요 누른 사용자 ID 목록
  comments: Comment[];
  sharedAt: number;
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: number;
}

// Firebase 설정이 있다고 가정
// 실제 사용시 Firebase 프로젝트 설정 필요
const FIREBASE_API_URL = process.env.NEXT_PUBLIC_FIREBASE_API_URL || "";
const USE_FIREBASE = process.env.NEXT_PUBLIC_USE_FIREBASE === "true";

// 로컬 스토리지 키
const STORAGE_KEY = "lol-roster-community";
const USER_NAME_KEY = "lol-roster-username";
const USER_ID_KEY = "lol-roster-userid";

// 사용자 ID 생성 (브라우저별 고유 ID)
function getUserId(): string {
  if (typeof window === "undefined") return "";

  let userId = localStorage.getItem(USER_ID_KEY);
  if (!userId) {
    userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem(USER_ID_KEY, userId);
  }
  return userId;
}

// Firebase에 저장 (실제 구현)
async function saveToFirebase(roster: CommunityRoster): Promise<void> {
  if (!USE_FIREBASE || !FIREBASE_API_URL) {
    console.log("Firebase not configured, using local storage");
    return;
  }

  try {
    const response = await fetch(`${FIREBASE_API_URL}/rosters`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(roster),
    });

    if (!response.ok) {
      throw new Error("Failed to save to Firebase");
    }
  } catch (error) {
    console.error("Firebase save error:", error);
    // Fallback to local storage
    saveToLocalStorage(roster);
  }
}

// Firebase에서 가져오기
async function fetchFromFirebase(): Promise<CommunityRoster[]> {
  if (!USE_FIREBASE || !FIREBASE_API_URL) {
    return getFromLocalStorage();
  }

  try {
    const response = await fetch(
      `${FIREBASE_API_URL}/rosters?limit=100&orderBy=sharedAt`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch from Firebase");
    }

    const data = await response.json();
    return data.rosters || [];
  } catch (error) {
    console.error("Firebase fetch error:", error);
    return getFromLocalStorage();
  }
}

// 로컬 스토리지 저장 (Fallback)
function saveToLocalStorage(roster: CommunityRoster): void {
  const existingRosters = getFromLocalStorage();
  existingRosters.unshift(roster);

  if (existingRosters.length > 100) {
    existingRosters.pop();
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(existingRosters));
}

// 로컬 스토리지에서 가져오기 (Fallback)
function getFromLocalStorage(): CommunityRoster[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to load from local storage:", error);
    return [];
  }
}

// 커뮤니티 로스터 저장
export async function saveToCommunity(
  roster: UserRoster,
  authorName: string
): Promise<CommunityRoster> {
  const communityRoster: CommunityRoster = {
    ...roster,
    authorName,
    likes: 0,
    likedBy: [],
    comments: [],
    sharedAt: Date.now(),
  };

  if (USE_FIREBASE) {
    await saveToFirebase(communityRoster);
  } else {
    saveToLocalStorage(communityRoster);
  }

  return communityRoster;
}

// 커뮤니티 로스터 가져오기
export async function getCommunityRosters(): Promise<CommunityRoster[]> {
  if (USE_FIREBASE) {
    return await fetchFromFirebase();
  } else {
    return getFromLocalStorage();
  }
}

// 좋아요 추가
export async function addLike(rosterId: string): Promise<void> {
  const userId = getUserId();

  if (USE_FIREBASE) {
    try {
      await fetch(`${FIREBASE_API_URL}/rosters/${rosterId}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
    } catch (error) {
      console.error("Firebase like error:", error);
    }
  } else {
    const rosters = getFromLocalStorage();
    const roster = rosters.find((r) => r.id === rosterId);

    if (roster && !roster.likedBy.includes(userId)) {
      roster.likes += 1;
      roster.likedBy.push(userId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(rosters));
    }
  }
}

// 댓글 추가
export async function addComment(
  rosterId: string,
  author: string,
  content: string
): Promise<void> {
  const comment: Comment = {
    id: Date.now().toString(),
    author,
    content,
    timestamp: Date.now(),
  };

  if (USE_FIREBASE) {
    try {
      await fetch(`${FIREBASE_API_URL}/rosters/${rosterId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(comment),
      });
    } catch (error) {
      console.error("Firebase comment error:", error);
    }
  } else {
    const rosters = getFromLocalStorage();
    const roster = rosters.find((r) => r.id === rosterId);

    if (roster) {
      roster.comments.push(comment);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(rosters));
    }
  }
}

// 사용자 이름 저장/가져오기
export function saveUserName(name: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(USER_NAME_KEY, name);
  }
}

export function getUserName(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(USER_NAME_KEY) || "";
}

export { getUserId };

import { Player, UserRoster } from '@/types';

// 로스터를 URL로 인코딩
export function encodeRosterToURL(roster: UserRoster): string {
  const positions = ['top', 'jungle', 'mid', 'adc', 'support'];
  const playerIds = positions
    .map(pos => {
      const player = roster[pos as keyof UserRoster] as Player | undefined;
      return player ? player.id : 'empty';
    })
    .join(',');

  return playerIds;
}

// URL에서 로스터 디코딩
export function decodeRosterFromURL(encoded: string): string[] {
  return encoded.split(',').filter(id => id !== 'empty');
}

// 공유 URL 생성
export function generateShareURL(roster: UserRoster): string {
  const encoded = encodeRosterToURL(roster);
  const baseURL = typeof window !== 'undefined' ? window.location.origin : '';
  return `${baseURL}/shared?roster=${encoded}`;
}

// 클립보드에 복사
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy:', err);
    return false;
  }
}

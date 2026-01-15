// 이 스크립트는 players-extended.ts의 isWinner가 true인 선수들에게
// championshipLeague와 championshipYear를 추가하는 유틸리티입니다.

// 우승 정보 매핑 (년도와 팀으로 리그 결정)
const championshipMap: Record<string, { league: string; year: number }> = {
  // Worlds Champions
  skt_2013: { league: "WORLDS", year: 2013 },
  ssw_2014: { league: "WORLDS", year: 2014 },
  skt_2015: { league: "WORLDS", year: 2015 },
  skt_2016: { league: "WORLDS", year: 2016 },
  ssg_2017: { league: "WORLDS", year: 2017 },
  ig_2018: { league: "WORLDS", year: 2018 },
  fpx_2019: { league: "WORLDS", year: 2019 },
  dwg_2020: { league: "WORLDS", year: 2020 },
  t1_2023: { league: "WORLDS", year: 2023 },
  t1_2024: { league: "WORLDS", year: 2024 },

  // MSI Champions (예시)
  rng_2018: { league: "MSI", year: 2018 },
  g2_2019: { league: "MSI", year: 2019 },
  dwg_2021: { league: "MSI", year: 2021 },
  rng_2021: { league: "MSI", year: 2021 },
  t1_2022: { league: "MSI", year: 2022 },
  jdg_2023: { league: "MSI", year: 2023 },
  blg_2024: { league: "MSI", year: 2024 },
  gen_2024: { league: "MSI", year: 2024 },

  // LCK Champions
  gen_2023_spring: { league: "LCK", year: 2023 },
  gen_2024_spring: { league: "LCK", year: 2024 },
  t1_2023_summer: { league: "LCK", year: 2023 },
  gen_2024_summer: { league: "LCK", year: 2024 },

  // LPL Champions
  jdg_2023_spring: { league: "LPL", year: 2023 },
  jdg_2023_summer: { league: "LPL", year: 2023 },
  blg_2024_spring: { league: "LPL", year: 2024 },
  blg_2024_summer: { league: "LPL", year: 2024 },

  // LEC Champions
  g2_2023_spring: { league: "LEC", year: 2023 },
  g2_2023_summer: { league: "LEC", year: 2023 },
  g2_2024_spring: { league: "LEC", year: 2024 },
  g2_2024_summer: { league: "LEC", year: 2024 },

  // ROX 2016 (LCK)
  rox_2016: { league: "LCK", year: 2016 },
};

// 팀 약자로 리그 결정 헬퍼
export function getChampionshipInfo(
  teamShort: string,
  year: number,
  isWinner: boolean
): { league?: string; championshipYear?: number } {
  if (!isWinner) return {};

  const key = `${teamShort.toLowerCase()}_${year}`;
  const info = championshipMap[key];

  if (info) {
    return {
      league: info.league,
      championshipYear: info.year,
    };
  }

  // 기본적으로 월드 챔피언십으로 가정 (isWinner가 true이고 매핑이 없는 경우)
  return {
    league: "WORLDS",
    championshipYear: year,
  };
}

// 사용 예시:
// const championshipInfo = getChampionshipInfo('T1', 2023, true);
// player = { ...player, championshipLeague: championshipInfo.league, championshipYear: championshipInfo.championshipYear };

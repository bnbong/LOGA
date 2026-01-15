export type Position = "TOP" | "JUNGLE" | "MID" | "ADC" | "SUPPORT";

export type League = "LCK" | "LPL" | "LEC" | "LCS" | "WORLDS" | "MSI";

export interface Player {
  id: string;
  name: string;
  realName?: string;
  position: Position;
  year: number;
  team?: string;
  teamShort: string;
  teamFull: string;
  teamColor: string;
  region: string;
  nationality: string;
  iso: string;
  isWinner?: boolean;
  championshipLeague?: League; // WORLDS, MSI, LCK, LPL, LEC, LCS
  championshipYear?: number;
}

export interface ChampionshipRoster {
  id: string;
  league: League;
  year: number;
  season?: "Spring" | "Summer";
  type: "winner" | "runnerUp";
  team: string;
  players: string[]; // player names
}

export interface UserRoster {
  id: string;
  top?: Player;
  jungle?: Player;
  mid?: Player;
  adc?: Player;
  support?: Player;
  createdAt: number;
  championship?: ChampionshipRoster;
}

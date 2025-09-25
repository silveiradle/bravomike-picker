export type MatchType = "BO1" | "BO3";
export type Starter = "A" | "B" | "RANDOM";
export type Phase = "ban" | "pick";
export type Status = "free" | "banned" | "picked";

export type MapStatus = { map: string; status: Status };
export type Picks = { A: string[]; B: string[] };

export type MatchState = {
  teamA: string;
  teamB: string;
  matchType: MatchType | "";
  starter: Starter;
  currentTurn: "A" | "B";
  phase: Phase;
  maps: MapStatus[];
  picks: Picks;
  decider?: string;
  setSetup: (v: {
    teamA: string;
    teamB: string;
    matchType: MatchType;
    starter: Starter;
  }) => void;
  clickMap: (map: string) => { done: boolean };
  reset: () => void;
};

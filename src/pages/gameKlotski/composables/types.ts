import type { modeType, gameStateType } from "@/types/gameType";

export interface cardStateType {
  context: number | null;
}

export interface stateType {
  mode: modeType;
  width: number;
  height: number;
  gameState: gameStateType;
  board: cardStateType[][];
  step: number;
  time: number;
}

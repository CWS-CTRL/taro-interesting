import type { gameStateType } from "@/types/gameType";

export type directionType = "Top" | "Right" | "Bottom" | "Left";

export interface coordType {
  x: number;
  y: number;
}

export interface cardStateType {
  context: number | null;
  isNew: Boolean;
}

export interface stateType {
  width: number;
  height: number;
  gameState: gameStateType;
  cards: cardStateType[][];
  currentDirection: directionType | undefined;
  newCard: cardStateType | undefined;
  score: number;
}

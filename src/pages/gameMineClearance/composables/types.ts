import type { modeType, gameStateType } from "@/types/gameType";

export interface mineStateType {
  x: number;
  y: number;
  isMark: Boolean; //是否插旗
  isDoubt: Boolean; //是否不确定
  longPressState: number; //长按该点的状态(无,插旗,不确定)
  isOpen: Boolean; //是否翻开
  aroundMines: number; //周围雷数
  isMine: Boolean; //是否是雷
}

export interface stateType {
  mode: modeType;
  width: number;
  height: number;
  mines: number;
  markNum: number;
  gameState: gameStateType;
  isMinesGenerate: Boolean;
  board: mineStateType[][];
  minesBlock: mineStateType[];
  time: number;
}

import type { CanvasContext } from "@tarojs/taro";

export interface pointType {
  x: number;
  y: number;
}

export interface branchType {
  x: number;
  y: number;
  angle: number;
}

export interface stateType {
  ctx: CanvasContext;
  width: number;
  height: number;
  steps: Function[];
  cloneSteps: Function[];
  curentDeeps: number;
  deeps: number;
  len: number;
}

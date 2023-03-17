import randomColor from "@/utils/randomColor";
import generateRandom from "@/utils/generateRandom";
import selectAngle from "@/utils/selectAngle";
import ControlsFn from "@/utils/controlsFn";

import { CanvasContext } from "@tarojs/taro";
import type { pointType, branchType, stateType } from "./types";

class PlumLogic {
  public state: stateType;

  //画线
  drawLine(start: pointType, end: pointType) {
    if (this.overflow(start) || this.overflow(end)) return;
    this.ctx.setStrokeStyle(randomColor());
    this.ctx.beginPath();
    this.ctx.moveTo(start.x, start.y);
    this.ctx.lineTo(end.x, end.y);
    this.ctx.stroke();
    this.ctx.draw(true);
  }

  //获取下一个点坐标
  getNextPoint(b: branchType) {
    const len = generateRandom(0, this.len);
    const { x, y, angle } = b;

    return {
      x: x + len * Math.cos(angle),
      y: y + len * Math.sin(angle),
    };
  }

  //添加左右枝叶
  step(b: branchType): void {
    const prevPoint = {
      x: b.x,
      y: b.y,
    };
    const nextPoint = this.getNextPoint(b);
    this.drawLine(prevPoint, nextPoint);

    const angle1 = b.angle + selectAngle(15) * Math.random();
    const angle2 = b.angle - selectAngle(15) * Math.random();

    if (this.deeps > this.currentDeeps || Math.random() < 0.5) {
      this.steps.push(() =>
        this.step({
          ...nextPoint,
          angle: angle1,
        })
      );
    }

    if (this.deeps > this.currentDeeps || Math.random() < 0.5) {
      this.steps.push(() =>
        this.step({
          ...nextPoint,
          angle: angle2,
        })
      );
    }
  }

  //溢出判断
  overflow(p: pointType) {
    const { x, y } = p;

    return x < 0 || x > this.width || y < 0 || y > this.height;
  }

  //执行动画
  //广度优先
  frame() {
    if (this.steps.length === 0) return;

    this.cloneSteps = this.steps;
    this.steps = [];
    this.currentDeeps++;
    this.cloneSteps.forEach((c) => c());
  }

  //重置
  reset() {
    this.init(this.ctx, this.width, this.height);
  }

  //初始化
  init(
    ctx: CanvasContext,
    width: number,
    height: number,
    deeps: number = 5,
    len: number = 5
  ) {
    this.state = {
      ctx,
      width,
      height,
      steps: [],
      cloneSteps: [],
      curentDeeps: 0,
      deeps,
      len,
    };

    this.ctx.clearRect(0, 0, width, height);
    const controlsFn = new ControlsFn();
    controlsFn.init(() => this.frame(), { immediate: false, frameCount: 3 });
    controlsFn.pause();
    this.initSteps();
    controlsFn.continue();
  }

  //初始化枝叶位置
  initSteps() {
    this.steps =
      Math.random() < 0.5
        ? [
            () =>
              this.step({
                x: generateRandom(0, this.width),
                y: 0,
                angle: selectAngle(90),
              }),
            () =>
              this.step({
                x: generateRandom(0, this.width),
                y: this.height,
                angle: selectAngle(-90),
              }),
          ]
        : [
            () =>
              this.step({
                x: 0,
                y: generateRandom(0, this.height),
                angle: selectAngle(0),
              }),
            () =>
              this.step({
                x: this.width,
                y: generateRandom(0, this.height),
                angle: selectAngle(180),
              }),
          ];
  }

  get ctx() {
    return this.state.ctx;
  }

  set ctx(newVal) {
    this.state.ctx = newVal;
  }

  get width() {
    return this.state.width;
  }

  set width(newVal) {
    this.state.width = newVal;
  }

  get height() {
    return this.state.height;
  }

  set height(newVal) {
    this.state.height = newVal;
  }

  get steps() {
    return this.state.steps;
  }

  set steps(newVal) {
    this.state.steps = newVal;
  }

  get cloneSteps() {
    return this.state.cloneSteps;
  }

  set cloneSteps(newVal) {
    this.state.cloneSteps = newVal;
  }

  get currentDeeps() {
    return this.state.curentDeeps;
  }

  set currentDeeps(newVal) {
    this.state.curentDeeps = newVal;
  }

  get deeps() {
    return this.state.deeps;
  }

  set deeps(newVal) {
    this.state.deeps = newVal;
  }

  get len() {
    return this.state.len;
  }

  set len(newVal) {
    this.state.len = newVal;
  }
}

export default PlumLogic;

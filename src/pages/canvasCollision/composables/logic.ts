import generateRandom from "@/utils/generateRandom";
import selectAngle from "@/utils/selectAngle";

import type { CanvasContext } from "@tarojs/taro";

interface starType {
  x: number;
  y: number;
  speedX: number;
  speedY: number;
}

interface stateType {
  ctx: CanvasContext;
  width: number;
  height: number;
  n: number;
  stars: starType[];
}

class StarsLogic {
  public state: stateType;

  init(ctx: CanvasContext, width: number, height: number) {
    this.state = {
      ctx,
      width,
      height,
      n: 5,
      stars: [],
    };
  }

  drawStats(n: number = this.n) {
    this.n = n;

    for (let i = 0; i < this.n; i++) {
      this.stars.push(this.createStar());
    }
  }

  moveStars() {
    const starsLen = this.stars.length;
    if (starsLen === 0) return;
    const cloneStars = this.stars;
    this.stars = [];

    // this.ctx.clearRect(0, 0, this.width, this.height);
    for (let i = 0; i < starsLen; i++) {
      const { x, y } = cloneStars[i];
      this.stars.push(this.createStar({ x: x + 10, y: y + 10 }));
    }
  }

  createStar(
    p: starType = {
      x: generateRandom(0, this.width),
      y: generateRandom(0, this.height),
      speedX: generateRandom(-3, 3),
      speedY: generateRandom(-3, 3),
    }
  ) {
    const { x, y, speedX, speedY } = p;

    this.ctx.beginPath();
    this.ctx.arc(x, y, 3, selectAngle(0), selectAngle(360));
    this.ctx.stroke();
    this.ctx.fill();
    this.ctx.draw(true);

    return {
      x,
      y,
      speedX,
      speedY,
    };
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

  get n() {
    return this.state.n;
  }

  set n(newVal) {
    this.state.n = newVal;
  }

  get stars() {
    return this.state.stars;
  }

  set stars(newVal) {
    this.state.stars = newVal;
  }
}

export default StarsLogic;

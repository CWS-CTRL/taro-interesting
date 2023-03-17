import { default as $randomColor } from "@/utils/randomColor";
import selectAngle from "@/utils/selectAngle";
import generateRandom from "@/utils/generateRandom";

import type { CanvasContext } from "@tarojs/taro";

interface optinosType {
  ctx: CanvasContext;
  width: number;
  height: number;
  x: number;
  y: number;
  color: string;
  radius: number;
  speedX: number;
  speedY: number;
  randomXY: Boolean;
  randomColor: Boolean;
  randomSpeed: Boolean;
}

class MoveCircle {
  public optinos: optinosType;

  constructor(options: _SelectRequired<optinosType, "ctx">) {
    const {
      ctx,
      width = 200,
      height = 200,
      x = 100,
      y = 100,
      color = "#000000",
      radius = 5,
      speedX = 5,
      speedY = 5,
      randomXY = false,
      randomColor = false,
      randomSpeed = false,
    } = options;

    this.optinos = {
      ctx,
      width,
      height,
      x: randomXY ? generateRandom(0, x) : x,
      y: randomXY ? generateRandom(0, y) : y,
      color: randomColor ? $randomColor() : color,
      radius,
      speedX: randomSpeed ? generateRandom(-speedX, speedX) : speedX,
      speedY: randomSpeed ? generateRandom(-speedY, speedY) : speedY,
      randomColor,
      randomXY,
      randomSpeed,
    };
  }

  draw() {
    this.ctx.setStrokeStyle(this.color);
    this.ctx.setFillStyle(this.color);
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, selectAngle(360));
    this.ctx.stroke();
    this.ctx.fill();
    this.ctx.draw(true);
  }

  move() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x <= 0 || this.x >= this.width) this.speedX *= -1;
    if (this.y <= 0 || this.y >= this.height) this.speedY *= -1;
  }

  get ctx() {
    return this.optinos.ctx;
  }
  set ctx(newVal) {
    this.optinos.ctx = newVal;
  }
  get width() {
    return this.optinos.width;
  }
  set width(newVal) {
    this.optinos.width = newVal;
  }
  get height() {
    return this.optinos.height;
  }
  set height(newVal) {
    this.optinos.height = newVal;
  }
  get x() {
    return this.optinos.x;
  }
  set x(newVal) {
    this.optinos.x = newVal;
  }
  get y() {
    return this.optinos.y;
  }
  set y(newVal) {
    this.optinos.y = newVal;
  }
  get color() {
    return this.optinos.color;
  }
  set color(newVal) {
    this.optinos.color = newVal;
  }
  get radius() {
    return this.optinos.radius;
  }
  set radius(newVal) {
    this.optinos.radius = newVal;
  }
  get speedX() {
    return this.optinos.speedX;
  }
  set speedX(newVal) {
    this.optinos.speedX = newVal;
  }
  get speedY() {
    return this.optinos.speedY;
  }
  set speedY(newVal) {
    this.optinos.speedY = newVal;
  }
}

export default MoveCircle;

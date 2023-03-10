import { getSystemInfoSync, CanvasContext } from "@tarojs/taro";

class SquareLogic {
  public sx: number;
  public sy: number;
  public gx: number;
  public gy: number;
  public opacity: number = 1;
  constructor(
    public ctx: CanvasContext,
    public x: number,
    public y: number,
    public len: number = 50,
    public color: string = "#000000",
    public speedY: number = 1
  ) {
    const { screenWidth, screenHeight } = getSystemInfoSync();
    this.sx = screenWidth;
    this.sy = Math.floor(screenHeight / 2);
    this.gx = this.x;
    this.gy = this.y;
  }

  drawGrid() {
    this.ctx.restore();
    this.ctx.beginPath();
    this.ctx.moveTo(this.gx, this.gy);
    this.ctx.lineTo(this.gx + this.len, this.gy);
    this.ctx.lineTo(this.gx + this.len, this.sy);
    this.ctx.lineTo(this.gx, this.sy);
    this.ctx.lineTo(this.gx, this.gy);
    this.ctx.setStrokeStyle("rgba(0,0,0,0.3)");
    this.ctx.stroke();
  }

  drawSquare() {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.setFillStyle(this.color);
    this.ctx.globalAlpha = this.opacity;
    this.ctx.fillRect(this.x, this.y, 50, 50);
  }

  move() {
    this.y += this.speedY;
    if (this.y >= this.sy - this.len || this.y <= 0) {
      this.speedY *= -1;
    }
  }
}

export default SquareLogic;

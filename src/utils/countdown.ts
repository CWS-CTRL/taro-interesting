import getSeconds from "./getSeconds";

// class Countdown {
//   public startTime: number = 0;
//   public endTime: number = 0;
//   public second: number = 0;
//   t: NodeJS.Timer | null;

//   constructor() {
//     return this;
//   }

//   create() {
//     this.startTime = this.endTime = +Date.now();
//     this.t = setInterval(() => {
//       this.endTime = +Date.now();
//       this.second = getSeconds(this.endTime, this.startTime);
//     });
//   }

//   reset() {
//     this.t && clearInterval(this.t);
//     this.create();
//   }

//   stop() {
//     this.t && clearInterval(this.t);
//   }
// }

class Countdown {
  public startTime: number = 0;
  public endTime: number = 0;
  public second: number = 0;
  public tag: Boolean = true;

  constructor() {
    return this;
  }

  create() {
    this.startTime = +Date.now();
  }

  reset() {
    this.startTime = 0;
    this.second = 0;
    this.tag = true;
  }

  pause() {
    this.tag = false;
  }

  continue() {
    this.startTime = +Date.now() - this.second * 1000;
    this.tag = true;
  }

  getSec() {
    if (!this.tag) return this.second;
    const now = +Date.now();
    this.second = getSeconds(now, this.startTime || now);
    return this.second;
  }
}

export default Countdown;

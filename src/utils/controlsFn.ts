interface optionsType {
  immediate: Boolean;
  frameCount: number;
}

//控制函数的执行与暂停
//一般用于动画
class ControlsFn {
  public fn: Function;
  public options: optionsType;
  public isActive: Boolean = false;
  public timeId: null | number = null;
  public count: number = 0;

  init(
    fn: Function,
    options: optionsType = { immediate: false, frameCount: 1 }
  ) {
    this.fn = fn;
    this.options = options;

    if (options.immediate) {
      this.continue();
    }
  }

  loop() {
    if (!this.isActive) return;
    this.count++;

    if (this.count % this.options.frameCount === 0) {
      this.fn();
    }
    this.timeId = requestAnimationFrame(() => this.loop());
  }

  pause() {
    this.isActive = false;
    if (this.timeId !== null) {
      cancelAnimationFrame(this.timeId);
      this.timeId = null;
    }
  }

  continue() {
    if (!this.isActive) {
      this.isActive = true;
      this.timeId = requestAnimationFrame(() => this.loop());
    }
  }
}

export default ControlsFn;

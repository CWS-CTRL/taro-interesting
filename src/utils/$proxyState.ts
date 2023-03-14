//@ts-nocheck

class $proxyState {
  public keysStack: string[] = [];

  deleteProxy() {
    if (this.keysStack.length) {
      Reflect.ownKeys(this.keysStack).forEach((key) => {
        Reflect.deleteProperty(this.state, key);
      });
    }
  }

  proxySome(key, val) {
    this.keysStack.push(key);
    Object.defineProperty($proxy.prototype, key, {
      get() {
        return val || this.state[key];
      },
      set(newVal) {
        if (this.state[key]) {
          this.state[key] = newVal;
        } else {
          this[key] = newVal;
        }
      },
      configurable: true,
      enumerable: true,
    });
  }

  proxyInit() {
    this.deleteProxy();
    this.keysStack.length = 0;
    Reflect.ownKeys(this.state).forEach((key) => {
      this.proxySome(key);
    });
  }

  proxyMineClearance() {
    this.proxyState();
  }
}

export default $proxy;

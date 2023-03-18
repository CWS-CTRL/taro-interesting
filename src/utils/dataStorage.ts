import {
  setStorageSync,
  getStorageSync,
  removeStorageSync,
  clearStorageSync,
} from "@tarojs/taro";
import getType from "./getType";

class DataStorage {
  set(key: string, data: any) {
    if (getType(data) === "object") data = JSON.stringify(data);

    setStorageSync(key, data);
  }

  get(key: string) {
    const data = getStorageSync(key) || "null";
    console.log(data);

    return data;
  }

  remove(key: string) {
    removeStorageSync(key);
  }

  clear() {
    clearStorageSync();
  }
}

export default new DataStorage();

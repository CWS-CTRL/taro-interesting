//洗牌算法
function shuffle(arr: any[]) {
  for (let i = arr.length - 1; i >= 0; i--) {
    const random = Math.floor(Math.random() * i);
    let temp = arr[random];
    arr[random] = arr[i];
    arr[i] = temp;
  }
  return arr;
}

export default shuffle;

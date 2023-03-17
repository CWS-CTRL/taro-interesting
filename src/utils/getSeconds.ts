//获取两个毫秒之间相差的秒数
function getSeconds(n1: number, n2: number): number {
  return Math.floor((n1 - n2) / 1000);
}

export default getSeconds;

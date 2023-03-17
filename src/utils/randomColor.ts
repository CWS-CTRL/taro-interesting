//随机十六进制颜色
function randomColor() {
  return `#${Math.floor(Math.random() * (1 << 24))
    .toString(16)
    .padStart(6, "0")}`;
}

export default randomColor;

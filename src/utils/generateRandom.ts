//随机获取min，max之间的整数
function generateRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

export default generateRandom;

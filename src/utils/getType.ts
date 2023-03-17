//获取类型
function getType(d: any) {
  return Object.prototype.toString.call(d).slice(8, -1).toLowerCase();
}

export default getType;

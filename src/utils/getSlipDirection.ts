type directionType = undefined | "Top" | "Right" | "Bottom" | "Left";

interface PageXY {
  pageX: number;
  pageY: number;
}

//获取滑动方向
function getSlipDirection(start: PageXY, end: PageXY): directionType {
  const offetX = end.pageX - start.pageX;
  const offsetY = end.pageY - start.pageY;
  //xy轴偏移量需要相差至少百分之20才被判断滑动
  if (offetX > 0 && offsetY > 0) {
    if (offetX / offsetY >= 1.2) return "Right";
    if (offsetY / offetX >= 1.2) return "Bottom";
  } else if (offetX > 0 && offsetY < 0) {
    if (offetX / offsetY <= -1.2) return "Right";
    if (offsetY / offetX <= -1.2) return "Top";
  } else if (offetX < 0 && offsetY > 0) {
    if (offetX / offsetY <= -1.2) return "Left";
    if (offsetY / offetX <= -0.12) return "Bottom";
  } else if (offetX < 0 && offsetY < 0) {
    if (offetX / offsetY >= 1.2) return "Left";
    if (offsetY / offetX >= 1.2) return "Top";
  }
}

export default getSlipDirection;

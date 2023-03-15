import generateRandom from "@/utils/generateRandom";
import type { modeType, gameStateType } from "@/types/gameType";
import type { mineStateType, stateType } from "./types";

const around = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
];

class MinesLogic {
  public state: stateType;

  constructor() {
    this.selectMode("Easy");
  }

  //选择模式
  selectMode(mode: modeType = "Easy") {
    switch (mode) {
      case "New":
        this.selectMode(this.mode);
        break;
      case "Easy":
        this.reset(9, 9, 10, "Easy");
        break;
      case "Medium":
        this.reset(9, 28, 40, "Medium");
        break;
      case "Hard":
        this.reset(9, 53, 99, "Hard");
        break;
      default:
        this.reset(9, 9, 10, "Easy");
    }
  }

  //初始化棋盘相关数据
  reset(width, height, mines, mode: modeType = "Easy") {
    this.state = {
      mode,
      width,
      height,
      mines,
      markNum: 0,
      gameState: "Ready",
      isMinesGenerate: false,
      board: Array.from({ length: height }, (block, x) =>
        Array.from({ length: width }, (mine, y) => ({
          x,
          y,
          isMark: false,
          isDoubt: false,
          longPressState: 0,
          isOpen: false,
          aroundMines: 0,
          isMine: false,
        }))
      ),
      minesBlock: [] as mineStateType[],
      time: 0,
    };
  }

  //生成地雷
  minesGenerate(mine: mineStateType) {
    const { x, y } = mine;
    let i = 0;

    while (i < this.mines) {
      const rx = generateRandom(0, this.height);
      const ry = generateRandom(0, this.width);

      if (
        !this.board[rx][ry].isMine &&
        !(Math.abs(x - rx) <= 1 && Math.abs(y - ry) <= 1)
      ) {
        const _mine = this.board[rx][ry];
        _mine.isMine = true;
        this.minesBlock.push(_mine);
        i++;
      }
    }
  }

  //获取一个点其周围的点数据
  getSiblings(mine: mineStateType) {
    return around
      .map(([dx, dy]) => {
        const x = mine.x + dx;
        const y = mine.y + dy;

        if (x < 0 || x >= this.height || y < 0 || y >= this.width)
          return undefined;

        return this.board[x][y];
      })
      .filter(Boolean) as mineStateType[];
  }

  //获取一个非雷点周围的雷数
  getSiblingsMines() {
    this.board.forEach((_minesBlock) => {
      _minesBlock.forEach((mine) => {
        if (mine.isMine) return;

        this.getSiblings(mine).forEach((_mine) => {
          if (_mine?.isMine) {
            mine.aroundMines++;
          }
        });
      });
    });
  }

  //翻开一个周围雷数为零的点其周围的点
  openZero(mine: mineStateType) {
    if (mine.aroundMines !== 0) return;

    this.getSiblings(mine).forEach((_mine) => {
      if (_mine.isOpen) return;
      this.openPoint(_mine);
      this.openZero(_mine);
    });
  }

  //翻开点
  openPoint(mine: mineStateType) {
    mine.isOpen = true;
    mine.isMark = false;
    mine.isDoubt = false;
  }

  //翻开所有为雷的点
  openMine() {
    this.minesBlock.forEach((mine) => {
      !mine.isMark && this.openPoint(mine);
    });
  }

  //游戏胜利条件
  //翻开所有非雷的点
  isWin() {
    return !this.boards.some(
      (mine: mineStateType) => !mine.isMine && !mine.isOpen
    );
  }

  //判断游戏结束
  gameOver(res: string) {
    switch (res) {
      case "lose":
        console.log("lose");
        break;
      case "win":
        console.log("win");
        break;
      default:
        let errr: never;
    }
  }

  //判断这个点是否可以触发事件
  triggerEvent(mine: mineStateType) {
    if (mine.isOpen || this.gameState === "Win" || this.gameState === "Lose") {
      return false;
    }

    return true;
  }

  //获取插旗点
  getMarkNums(): number {
    return this.boards.filter((mine: mineStateType) => mine.isMark).length;
  }

  //点击事件
  onTap(mine: mineStateType) {
    if (!this.triggerEvent(mine)) return;
    if (this.gameState === "Ready") {
      this.state.isMinesGenerate = true;
      this.minesGenerate(mine);
      this.getSiblingsMines();
      this.gameState = "Play";
    }

    this.openPoint(mine);
    this.markNum = this.getMarkNums();

    //判断游戏失败
    if (mine.isMine) {
      this.openMine();
      this.gameState = "Lose";
      this.gameOver("lose");
      return;
    }

    this.openZero(mine);

    //判断游戏胜利
    if (this.isWin()) {
      this.gameState = "Win";
      this.gameOver("win");
      return;
    }
  }

  //长按事件
  onLongPress(mine: mineStateType) {
    if (!this.triggerEvent(mine) || this.gameState === "Ready") return;

    mine.longPressState = (mine.longPressState + 1) % 3;
    mine.isMark = !!(mine.longPressState & 1);
    mine.isDoubt = !!(mine.longPressState & 2);
    this.markNum = this.getMarkNums();

    // 0  0
    // 1  0
    // 0  1
    // 0  0
  }

  //考虑下面大量的get set是否可以使用代理实现
  //使用代理ts会报一大堆错，暂时就这样
  get mode() {
    return this.state.mode;
  }

  set mode(newVal) {
    this.state.mode = newVal;
  }

  get width() {
    return this.state.width;
  }

  set width(newVal) {
    this.state.width = newVal;
  }

  get height() {
    return this.state.height;
  }

  set height(newVal) {
    this.state.height = newVal;
  }

  get mines() {
    return this.state.mines;
  }

  set mines(newVal) {
    this.state.mines = newVal;
  }

  get markNum() {
    return this.state.markNum;
  }

  set markNum(newVal) {
    this.state.markNum = newVal;
  }

  get gameState() {
    return this.state.gameState;
  }

  set gameState(newVal) {
    this.state.gameState = newVal;
  }

  get board() {
    return this.state.board;
  }

  get boards() {
    return this.board.flat();
  }

  get minesBlock() {
    return this.state.minesBlock;
  }
}

export default MinesLogic;

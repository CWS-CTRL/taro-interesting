// import getType from "@/utils/getType";
import type { modeType, gameStateType } from "@/types/gameType";

const direction = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
];

interface mineState {
  x: number;
  y: number;
  isMark: Boolean; //是否插旗
  isDoubt: Boolean; //是否不确定
  longPressState: number; //长按该点的状态(无,插旗,不确定)
  isOpen: Boolean; //是否翻开
  aroundMines: number; //周围雷数
  isMine: Boolean; //是否是雷
}

interface State {
  mode: modeType;
  width: number;
  height: number;
  mines: number;
  markNum: number;
  gameState: gameStateType;
  isMinesGenerate: Boolean;
  board: mineState[][];
  minesBlock: mineState[];
  time: number;
}

//有大量待优化的地方
class MinesLogic {
  public state: State;

  constructor() {
    this.seleteMode("Easy");
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
          x: x,
          y: y,
          isMark: false,
          isDoubt: false,
          longPressState: 0,
          isOpen: false,
          aroundMines: 0,
          isMine: false,
        }))
      ),
      minesBlock: [] as mineState[],
      time: 0,
    };

    this.width = width;
    this.height = height;
    this.mines = mines;
    this.mode = mode;
  }

  //生成地雷
  minesGenerate(mine: mineState) {
    const { x, y } = mine;
    let i = 0;

    while (i < this.mines) {
      const rx = this.generateRandom(0, this.height);
      const ry = this.generateRandom(0, this.width);

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
  getSiblings(mine: mineState) {
    return direction
      .map(([dx, dy]) => {
        const x = mine.x + dx;
        const y = mine.y + dy;

        if (x < 0 || x >= this.height || y < 0 || y >= this.width)
          return undefined;

        return this.board[x][y];
      })
      .filter(Boolean) as mineState[];
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
  openZero(mine: mineState) {
    if (mine.aroundMines !== 0) return;

    this.getSiblings(mine).forEach((_mine) => {
      if (_mine.isOpen) return;
      this.openPoint(_mine);
      this.openZero(_mine);
    });
  }

  //翻开点
  openPoint(mine: mineState) {
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
  isWin() {
    return !this.boards.some((mine: mineState) => !mine.isMine && !mine.isOpen);
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
        let unknown: never;
    }
  }

  //判断这个点是否可以触发事件
  triggerEvent(mine: mineState) {
    const { gameState, isMinesGenerate, board } = this.state;
    if (mine.isOpen || gameState === "Win" || gameState === "Lose") {
      return false;
    }

    return true;
  }

  //选择模式
  seleteMode(mode: modeType = "Easy", setData?: Function) {
    switch (mode) {
      case "New":
        this.seleteMode(this.state.mode, setData);
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
    setData && this.setToData(this.state, setData);
  }

  //获取插旗点
  getMarkNums(): number {
    return this.boards.filter((mine: mineState) => mine.isMark).length;
  }

  //点击事件
  onTap(mine: mineState, setData) {
    const { gameState, isMinesGenerate, board } = this.state;

    if (!this.triggerEvent(mine)) return;
    if (gameState === "Ready") {
      // this.endTime = this.startTime = getSeconds(Date.now());
      this.state.isMinesGenerate = true;
      this.minesGenerate(mine);
      this.getSiblingsMines();
      this.state.gameState = "Play";
    }

    this.openPoint(mine);

    //判断游戏失败
    if (mine.isMine) {
      this.openMine();
      this.state.gameState = "Lose";
      this.setToData(this.state, setData);
      this.gameOver("lose");
      return;
    }

    this.openZero(mine);

    //判断游戏胜利
    if (this.isWin()) {
      this.state.gameState = "Win";
      this.setToData(this.state, setData);
      this.gameOver("win");
      return;
    }

    this.setToData(this.state, setData);
  }

  //长按事件
  onLongPress(mine: mineState, setData) {
    const { gameState } = this.state;
    if (!this.triggerEvent(mine) || gameState === "Ready") return;

    mine.longPressState = (mine.longPressState + 1) % 3;
    mine.isMark = !!(mine.longPressState & 1);
    mine.isDoubt = !!(mine.longPressState & 2);

    this.setToData(this.state, setData);

    // 0  0
    // 1  0
    // 0  1
    // 0  0
  }

  //随机获取min，max之间的整数
  generateRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  //react 执行useState使页面重新渲染
  setToData(data: State, setData) {
    // this.endTime = getSeconds(Date.now());
    data.markNum = this.getMarkNums();
    setData({ ...data });
  }

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

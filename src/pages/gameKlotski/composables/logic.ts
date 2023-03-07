import type { modeType, gameStateType } from "@/types/gameType";

interface cardState {
  context: number | null;
}

interface State {
  mode: modeType;
  width: number;
  height: number;
  gameState: gameStateType;
  board: cardState[][];
  step: number;
  time: number;
}

class KlotskiLogic {
  public state: State;

  constructor() {
    this.seleteMode("Easy");
  }

  //选择模式
  seleteMode(mode: modeType = "Easy") {
    switch (mode) {
      case "New":
        this.seleteMode(this.mode);
        break;
      case "Easy":
        this.reset(3, 3, "Easy");
        break;
      case "Medium":
        this.reset(4, 4, "Medium");
        break;
      case "Hard":
        this.reset(5, 5, "Hard");
        break;
      default:
        this.reset(3, 3, "Easy");
    }
  }

  reset(width, height, mode: modeType = "Easy") {
    this.state = {
      mode,
      width,
      height,
      gameState: "Ready",
      board: Array.from({ length: height }, (_x, x) =>
        Array.from({ length: width }, (_y, y) => ({
          context: width * x + y + 1,
        }))
      ),
      step: 0,
      time: 0,
    };

    this.board[height - 1][width - 1].context = null;
  }

  //打乱卡片位置
  //洗牌算法
  cardMess() {
    for (let i = this.boards.length - 1; i >= 0; i--) {
      const random = Math.floor(Math.random() * i);
      let temp = this.boards[random].context;
      this.boards[random].context = this.boards[i].context;
      this.boards[i].context = temp;
    }

    if (!(this.cardsVerify() % 2 === 0)) {
      this.cardMess();
    }
  }

  //判断打乱的卡片是否有解
  //当卡片行数为奇数时，则逆序数必须为偶数
  //当卡片行数为偶数时，则逆序数加当前空格所在行数必须为偶数
  cardsVerify() {
    const len = this.contexts.length;
    let res = 0;
    for (let i = 0; i < len - 1; i++) {
      const context = this.contexts[i];
      for (let j = i + 1; j < len; j++) {
        res += +(context > this.contexts[j]);
      }
    }

    if (this.height % 2 == 1) {
      return res;
    } else {
      const { bx } = this.findBlankCard() as { bx: number; by: number };

      return res + bx + 1;
    }
    return res;
  }

  //找到内容为空的卡片
  findBlankCard() {
    for (let x = 0; x < this.height; x++) {
      for (let y = 0; y < this.width; y++) {
        if (this.board[x][y].context == null) {
          return {
            bx: x,
            by: y,
          };
        }
      }
    }
  }

  //判断这个点是否可以触发事件
  //点击的卡必须与空白卡位于相同的x轴或y轴
  triggerEvent(p) {
    const { x, y } = p;
    const { bx, by } = this.findBlankCard() as { bx: number; by: number };

    if (x == bx || y == by) {
      let tag, relative;
      if (x == bx) {
        relative = y - by;
        tag = relative > 0 ? "left" : "right";
      } else if (y == by) {
        relative = x - bx;
        tag = relative > 0 ? "top" : "bottom";
      }
      return {
        tag,
        p,
        moveStep: Math.abs(relative),
      };
    }
  }

  //执行移动操作
  cardMove(message) {
    const { tag, p, moveStep } = message;
    const { x, y } = p;
    let context;

    if (tag === "left") {
      //   点击2
      //   0 1 2
      //   ->
      //   1 2 0
      for (let i = moveStep; i > 0; i--) {
        context = this.board[x][y - i + 1].context;
        this.board[x][y - i].context = context;
      }
    } else if (tag === "right") {
      //   点击1
      //   1 2 0
      //   ->
      //   0 1 2
      for (let i = moveStep; i > 0; i--) {
        context = this.board[x][y + i - 1].context;
        this.board[x][y + i].context = context;
      }
    } else if (tag === "top") {
      //   点击6
      //   0    3
      //   3 -> 6
      //   6    0
      for (let i = moveStep; i > 0; i--) {
        context = this.board[x - i + 1][y].context;
        this.board[x - i][y].context = context;
      }
    } else if (tag === "bottom") {
      //   点击3
      //   3    0
      //   6 -> 3
      //   0    6
      for (let i = moveStep; i > 0; i--) {
        context = this.board[x + i - 1][y].context;
        this.board[x + i][y].context = context;
      }
    }

    //点击的卡片内容设置为零
    this.board[x][y].context = null;
  }

  //胜利条件
  //最后一个是空卡片并且逆序数为零
  isWin() {
    return (
      this.boards[this.width * this.height - 1].context === null &&
      this.cardsVerify() === (this.height % 2 == 1 ? 0 : this.height)
    );
  }

  //点击事件，空白卡未此绑定事件
  onTap(p: { x: number; y: number }) {
    if (this.gameState === "Win") return;

    if (this.gameState === "Ready") {
      this.cardMess();
      this.gameState = "Play";
      return;
    }

    const message = this.triggerEvent(p);
    if (!message) return;

    this.cardMove(message);
    this.step++;

    if (this.isWin()) {
      console.log("win");
      this.gameState = "Win";
    }
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

  set wodth(newVal) {
    this.state.width = newVal;
  }

  get height() {
    return this.state.height;
  }

  set height(newVal) {
    this.state.height = newVal;
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
    return this.state.board.flat();
  }

  get contexts() {
    return this.boards.map((card) => card.context).filter(Boolean) as number[];
  }

  get step() {
    return this.state.step;
  }

  set step(newVal) {
    this.state.step = newVal;
  }
}

export default KlotskiLogic;

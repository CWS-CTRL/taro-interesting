import generateRandom from "@/utils/generateRandom";
import type { gameStateType } from "@/types/gameType";

type directionType = "Top" | "Right" | "Bottom" | "Left";

interface coordType {
  x: number;
  y: number;
}

interface cardStateType {
  context: number | null;
  isNew: Boolean;
}

interface stateType {
  width: number;
  height: number;
  gameState: gameStateType;
  cards: cardStateType[][];
  currentDirection: directionType | undefined;
  newCard: cardStateType | undefined;
  score: number;
}

//t r b l
const around = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

class $2048Logic {
  public state: stateType;

  constructor() {
    this.newGame();
  }

  //重新开始游戏
  newGame() {
    this.reset();
  }

  reset(width = 3, height = 3) {
    this.state = {
      width,
      height,
      gameState: "Ready",
      cards: Array.from({ length: height }, (cardsRow, x) =>
        Array.from({ length: width }, (card, y) => ({
          context: null,
          isNew: false,
        }))
      ),
      currentDirection: undefined,
      newCard: undefined,
      score: 0,
    };

    const rx = generateRandom(0, this.height);
    const ry = generateRandom(0, this.width);
    this.cards[rx][ry].context = 2;
  }

  //初始化卡片的xy坐标
  // resetXY() {
  //   this.cards.forEach((cardsRow, x) => {
  //     cardsRow.forEach((card, y) => {
  //       card.x = x;
  //       card.y = y;
  //     });
  //   });
  // }

  //获取一个卡片其周围的卡片数据
  getSiblings(c: coordType) {
    return around.map(([dx, dy]) => {
      const x = c.x + dx;
      const y = c.y + dy;

      if (x < 0 || x >= this.height || y < 0 || y >= this.width)
        return undefined;

      return this.cards[x][y];
    }) as (cardStateType | undefined)[];
    // .filter(Boolean) as cardStateType[];
  }

  //验证空格
  //     Top
  //    1     2     3
  //    null  5     6   Yes
  //    7     8     9
  //------------------------
  //    1     2     3
  //    null  5     6   No
  //    null  8     9
  blankVerify(c: coordType): Boolean {
    const { x, y } = c;
    switch (this.currentDirection) {
      case "Top":
        return x < this.height - 1 && !!this.cards[x + 1][y].context;
        break;
      case "Right":
        return y > 0 && !!this.cards[x][y - 1].context;
        break;
      case "Bottom":
        return x > 0 && !!this.cards[x - 1][y].context;
        break;
      case "Left":
        return y < this.width - 1 && !!this.cards[x][y + 1].context;
        break;
      default:
        return false;
    }
  }

  //内容验证
  //    Top
  //   1 2 3
  //   1 5 6   Yes
  //   7 8 9
  //-----------------
  //   1 1 3
  //   4 5 6   No
  //   7 8 9
  contextVerify(_context: number, c: coordType): Boolean {
    return this.getSiblings(c).some((card, x) => {
      if (!card?.context) return false;
      const { context } = card;
      if (
        this.currentDirection === "Top" ||
        this.currentDirection === "Bottom"
      ) {
        return x % 2 === 0 && _context === context;
      } else {
        return x % 2 === 1 && _context === context;
      }
    });
  }

  //当前移动方向是否可以触发移动
  triggerEvent() {
    return this.cards.some((cadsRow, x) =>
      cadsRow.some(({ context }, y) => {
        return (
          (context === null && this.blankVerify({ x, y })) ||
          this.contextVerify(context as number, { x, y })
        );
      })
    );
  }

  //随机给一个context为null的点生成数字(百分之九十生成2，百分之十生成4)
  //移动之后执行
  generateNums() {
    const blankCardsLen = this.blankCards.length;
    if (blankCardsLen) {
      const newCard = this.blankCards[generateRandom(0, blankCardsLen)];
      this.newCard = newCard;
      newCard.context = Math.random() > 0.1 ? 2 : 4;
      newCard.isNew = true;
    }
  }

  //判断此时的盘面是否有解
  //只要存在可以移动就可以
  cardsVerify() {
    return this.cards.some((cardsRow, cx) =>
      cardsRow.some((card, cy) =>
        this.getSiblings({ x: cx, y: cy }).some(
          (_card) => _card && (!_card.context || card.context === _card.context)
        )
      )
    );
  }

  //判断胜利
  isWin() {
    return (
      Math.max(...this.cardsFlat.map(({ context }) => Number(context))) === 2048
    );
  }

  onTouchEnd(d: directionType) {
    if (this.gameState === "Lose") return;
    this.currentDirection = d;
    if (this.newCard) this.newCard.isNew = false;

    //判断事件触发可行性，移动卡片，生成卡片
    if (this.triggerEvent()) {
      this.gameState = "Play";
      this.moveCards();
      this.generateNums();
    }

    //判断输赢
    if (!this.blankCards.length && !this.cardsVerify()) {
      this.gameState = "Lose";
    } else if (this.isWin()) {
      this.gameState = "Win";
    }
  }

  //移动卡片
  moveCards() {
    this[`move${this.currentDirection}`]();
  }

  //合并数字
  mergeNums(prevCard: cardStateType | undefined, card: cardStateType) {
    const { context } = card;
    if (context) {
      if (prevCard) {
        if (prevCard.context == context) {
          prevCard.context += context;
          this.score += prevCard.context;
          card.context = null;
          return;
        }
      }
      return card;
    }
    return prevCard;
  }

  //移动零
  moveZero(
    occupyIndex: number,
    occupyCard: cardStateType,
    card: cardStateType
  ) {
    const { context } = card;
    const occupyContext = occupyCard.context;
    if (context) {
      let swap = occupyContext;
      occupyCard.context = context;
      card.context = swap;
      occupyIndex++;
    }

    return occupyIndex;
  }

  moveTop() {
    for (let i = 0; i < this.width; i++) {
      //合并相同的分数(只合并一层，如果合并之后的数与下一个数相同不会再次合并)
      let prevCard;
      for (let j = 0; j < this.height; j++) {
        const card = this.cards[j][i];
        prevCard = this.mergeNums(prevCard, card);
      }

      //将数紧凑排在移动方向上
      let occupyIndex = 0;
      for (let k = 0; k < this.height; k++) {
        let card = this.cards[k][i];
        const occupyCard = this.cards[occupyIndex][i];
        occupyIndex = this.moveZero(occupyIndex, occupyCard, card);
      }
    }
  }

  moveRight() {
    for (let i = 0; i < this.height; i++) {
      const cardsRow = this.cards[i];
      let prevCard;
      for (let j = 0; j < this.width; j++) {
        const card = cardsRow[this.width - 1 - j];
        prevCard = this.mergeNums(prevCard, card);
      }

      let occupyIndex = 0;
      for (let k = 0; k < this.width; k++) {
        let card = cardsRow[this.width - 1 - k];
        const occupyCard = cardsRow[this.width - 1 - occupyIndex];
        occupyIndex = this.moveZero(occupyIndex, occupyCard, card);
      }
    }
  }

  moveBottom() {
    for (let i = 0; i < this.width; i++) {
      let prevCard;
      for (let j = 0; j < this.height; j++) {
        const card = this.cards[this.height - 1 - j][i];
        prevCard = this.mergeNums(prevCard, card);
      }

      let occupyIndex = 0;
      for (let k = 0; k < this.height; k++) {
        let card = this.cards[this.height - 1 - k][i];
        const occupyCard = this.cards[this.height - 1 - occupyIndex][i];
        occupyIndex = this.moveZero(occupyIndex, occupyCard, card);
      }
    }
  }

  moveLeft() {
    for (let i = 0; i < this.height; i++) {
      const cardsRow = this.cards[i];
      let prevCard;
      for (let j = 0; j < this.width; j++) {
        const card = cardsRow[j];
        prevCard = this.mergeNums(prevCard, card);
      }

      let occupyIndex = 0;
      for (let k = 0; k < this.width; k++) {
        let card = cardsRow[k];
        const occupyCard = cardsRow[occupyIndex];
        occupyIndex = this.moveZero(occupyIndex, occupyCard, card);
      }
    }
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

  get gameState() {
    return this.state.gameState;
  }

  set gameState(newVal) {
    this.state.gameState = newVal;
  }

  get cards() {
    return this.state.cards;
  }

  get cardsFlat() {
    return this.state.cards.flat();
  }

  get blankCards() {
    return this.cardsFlat.filter(({ context }) => !context);
  }

  get currentDirection() {
    return this.state.currentDirection;
  }

  set currentDirection(newVal) {
    this.state.currentDirection = newVal;
  }

  get newCard() {
    return this.state.newCard;
  }

  set newCard(newVal) {
    this.state.newCard = newVal;
  }

  get score() {
    return this.state.score;
  }

  set score(newVal) {
    this.state.score = newVal;
  }
}

export default $2048Logic;

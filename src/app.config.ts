export default defineAppConfig({
  pages: [
    "pages/canvasCollision/index",
    "pages/gameSundry/index",
    "pages/gameMineClearance/index",
    "pages/gameKlotski/index",
    "pages/game2048/index",
    "pages/canvasSundry/index",
    "pages/canvasPlum/index",
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    color: "#aaabbb",
    selectedColor: "#000000",
    list: [
      {
        pagePath: "pages/gameSundry/index",
        text: "game",
        iconPath: "./assets/image/tabbar/game.png",
        selectedIconPath: "./assets/image/tabbar/game-active.png",
      },
      {
        pagePath: "pages/canvasSundry/index",
        text: "figure",
        iconPath: "./assets/image/tabbar/figure.png",
        selectedIconPath: "./assets/image/tabbar/figure-active.png",
      },
    ],
  },
});

import React, { useState, useEffect } from "react";
import { useLoad, useUnload } from "@tarojs/taro";
import { View, Text, Button } from "@tarojs/components";
import GameState from "@/components/gameState";
import Time from "@/components/time";

import type { modeType, gameStateType } from "@/types/gameType";

import MinesLogic from "./composables/logic";
import Countdown from "@/utils/countdown";

const minesLogic = new MinesLogic();
const countdown = new Countdown();
const mode: modeType[] = ["New", "Easy", "Medium", "Hard"];
const numColor = ["", "text-teal-300", "text-teal-400", "text-green-400", "text-green-600", "text-orange-400", "text-orange-600", "text-red-400", "text-red-600"]

function MineClearance() {
  const [data, setData] = useState(minesLogic.state);
  const { board, mines, markNum, gameState } = data;

  if (gameState === "Win" || gameState === "Lose") {
    minesLogic.state.time = countdown.getSec();
  }

  useLoad(() => {
    if (gameState === "Play") {
      countdown.continue();
      setData({ ...minesLogic.state })
    }
  })

  useUnload(() => {
    gameState === "Play" && countdown.pause();
  })

  return (
    <View className="py-8">
      <View className="flex justify-evenly mb-4 text-xs">
        {mode.map(title => <Button className="basis-14 btn-reset len-8 leading-6 bg-teal-500 text-white" onTap={() => {
          countdown.reset();
          minesLogic.seleteMode(title);
          setData({ ...minesLogic.state });
        }}><Text className="text-xs">{title}</Text></Button>)}
      </View>
      <View className="flex justify-evenly mb-4">
        <GameState gameState={gameState} />
        <Time isGo={data.gameState === "Play"} t={countdown} />
        <View><Text className="iconfont icon-zhadan text-2xl" /><Text>{mines - markNum}</Text></View>
      </View>
      <View>
        {
          board.map((minesBlock, my) => (<View className="flex justify-center" key={my}>{minesBlock.map((mine, mx) => {
            const { isOpen, isMark, isDoubt, aroundMines, isMine, } = mine;
            return (<Button
              className="btn-reset len-8 leading-8"

              onTap={() => {
                gameState === "Ready" && countdown.create();
                minesLogic.onTap(mine);
                setData({ ...minesLogic.state })
              }}

              onLongPress={() => {
                minesLogic.onLongPress(mine);
                setData({ ...minesLogic.state })
              }}
              key={`${mx}.${my}`}>{isOpen
                ? <View>{isMine
                  ? <View className="w-full h-full bg-red-600"><Text className="text-lg iconfont icon-zhadan"></Text></View>
                  : <Text className={`${numColor[aroundMines]}`}>{aroundMines > 0 ? aroundMines : ""}</Text>}</View>
                : <View className="w-full h-full bg-gray-300"><Text className={`text-lg iconfont ${isMark ? `icon-qizhi text-red-600` : isDoubt ? `icon-wenhao text-black` : ""}`} /></View>}
            </Button>
            )
          }
          )}</View>))
        }
      </View>
    </View>

    // <Fireworks></Fireworks>
    // <Refresh />
  )
}

export default MineClearance;

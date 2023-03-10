import React, { useState } from "react";
import { useLoad, useUnload } from "@tarojs/taro";
import { View, Text, Button } from "@tarojs/components";
import GameState from "@/components/gameState";
import Time from "@/components/time";

import type { modeType, gameStateType } from "@/types/gameType";

import KlotskiLogic from "./composables/logic";
import Timer from "@/utils/timer";

const klotskiLogic = new KlotskiLogic();
const timer = new Timer();
const mode: modeType[] = ["New", "Easy", "Medium", "Hard"];
const containerClass = [, , "grid-cols-2 grid-rows-2", "grid-cols-3 grid-rows-3", "grid-cols-4 grid-rows-4", "grid-cols-5 grid-rows-5", "grid-cols-6 grid-rows-6"];

function GameKlotski() {
  const [data, setData] = useState(klotskiLogic.state);
  const { board, width, height, gameState, step } = data;

  if (gameState === "Lose" || gameState === "Win") {
    klotskiLogic.state.time = timer.getSec();
    timer.pause();
  }

  useLoad(() => {
    if (gameState === "Play") {
      timer.continue();
      setData({ ...klotskiLogic.state })
    }
  })
  useUnload(() => {
    gameState === "Play" && timer.pause();
  })

  return <View className="py-8">
    <View className="flex justify-evenly mb-4 text-xs">
      {mode.map(title => <Button className="basis-14 btn-reset len-8 leading-6 bg-teal-500 text-white" key={title} onTap={() => {
        timer.reset();
        klotskiLogic.seleteMode(title);
        setData({ ...klotskiLogic.state });
      }}><Text className="text-xs">{title}</Text></Button>)}
    </View>

    <View className="flex justify-evenly mb-4">
      <GameState gameState={gameState} />
      <Time isGo={data.gameState === "Play"} t={timer} />
      <View><Text className="iconfont icon-bushu text-2xl" /><Text>{step}</Text></View>
    </View>
    <View className={`grid ${containerClass[width]} border-default`}>{
      board.map((blocks, x) =>
        blocks.map(({ context }, y) => (
          <View key={context}>{context ? <Button className="grid place-content-center btn-reset full aspect-square bg-red-200" onTap={() => {
            gameState === "Ready" && timer.create();
            klotskiLogic.onTap({ x, y })
            setData({ ...klotskiLogic.state });
          }}><View className="text-4xl font-bold">{context}</View></Button> : ""}
          </View>
        ))


      )
    }</View>
  </View>
};

export default GameKlotski;


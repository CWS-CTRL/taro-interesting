import React, { useState } from "react";
import { useLoad, useUnload } from "@tarojs/taro";

import { View, } from "@tarojs/components";
import { Controls, State, Frame } from "./cpns"


import MinesLogic from "./composables/logic";
import Timer from "@/utils/timer";

const minesLogic = new MinesLogic();
const timer = new Timer();

function GameMineClearance() {
  const [data, setData] = useState(minesLogic.state);
  const { gameState } = data;

  if (gameState === "Win" || gameState === "Lose") {
    minesLogic.state.time = timer.getSec();
    timer.pause();
  }

  useLoad(() => {
    if (gameState === "Play") {
      timer.continue();
      setData({ ...minesLogic.state })
    }
  })

  useUnload(() => {
    gameState === "Play" && timer.pause();
  })

  return (
    <View className="py-8">
      <Controls setData={setData} logicObj={minesLogic} timer={timer} />
      <State data={data} timer={timer} />
      <Frame setData={setData} logicObj={minesLogic} timer={timer} />
    </View>
  )
}

export default GameMineClearance;

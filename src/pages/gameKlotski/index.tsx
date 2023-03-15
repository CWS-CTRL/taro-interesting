import React, { useState } from "react";
import { useLoad, useUnload } from "@tarojs/taro";

import { View } from "@tarojs/components";
import { Controls, State, Frame } from "./cpns"

import KlotskiLogic from "./composables/logic";
import Timer from "@/utils/timer";

const klotskiLogic = new KlotskiLogic();
const timer = new Timer();

function GameKlotski() {
  const [data, setData] = useState(klotskiLogic.state);
  const { gameState } = data;

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
    <Controls setData={setData} logicObj={klotskiLogic} timer={timer} />
    <State data={data} timer={timer} />
    <Frame setData={setData} logicObj={klotskiLogic} timer={timer} />
  </View>
};

export default GameKlotski;


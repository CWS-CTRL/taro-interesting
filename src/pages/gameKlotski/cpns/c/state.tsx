import React from "react";

import { View, Text } from "@tarojs/components";
import { GameState, Time } from "@/components"

import type { stateType } from "../../composables/types";

interface propsType {
  data: stateType;
  timer: Object;
}

function State(props: propsType) {
  const { data: { gameState, step }, timer } = props;


  return <View
    className="flex justify-evenly mb-4">
    <GameState gameState={gameState} />
    <Time isGo={gameState === "Play"} t={timer} />
    <View>
      <Text className="iconfont icon-bushu text-2xl" />
      <Text>
        {step}
      </Text>
    </View>
  </View>
}

export default State;

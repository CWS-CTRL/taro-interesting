import React from "react";

import { View, Text } from "@tarojs/components";

import { GameState, Time } from "@/components/index";

import type { modeType, gameStateType } from "@/types/gameType";


interface propsType {
  data: {
    gameState: gameStateType;
    mines: number;
    markNum: number;
  },
  timer: Object
}

function State(props: propsType) {
  const { data: { gameState, mines, markNum }, timer } = props;

  return <View className="flex justify-evenly mb-4">
    <GameState gameState={gameState} />
    <Time isGo={gameState === "Play"} t={timer} />
    <View><Text className="iconfont icon-zhadan text-2xl" /><Text>{mines - markNum}</Text></View>
  </View>
}

export default State;

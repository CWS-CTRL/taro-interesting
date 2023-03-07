import React from "react";
import { View, Text } from "@tarojs/components";

import type { gameStateType } from "@/types/gameType";

interface propsType {
  gameState: gameStateType
}

function GameState(props: propsType) {
  const { gameState } = props;
  const gameStateClass = `iconfont icon-${gameState}`;

  return <View><Text className={`${gameStateClass} text-2xl`} /><Text>{gameState}</Text></View>
}

export default GameState;

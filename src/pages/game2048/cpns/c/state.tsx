import React from "react";
import { View, Text } from "@tarojs/components";
import { GameState } from "@/components";

import type { stateType } from "../../composables/types";

interface propsType {
  data: stateType
}

function State(props: propsType) {
  const { data: { gameState, score } } = props;

  return <>
    <GameState gameState={gameState} />
    <View>
      <Text
        className="text-2xl">
        得分：{score}
      </Text>
    </View>
  </>
}

export default State;

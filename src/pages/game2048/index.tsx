import React, { useState } from "react";

import { View } from "@tarojs/components";
import { Controls, State, Frame } from "./cpns";

import $2048Logic from "./composables/logic";

const _2048Logic = new $2048Logic();

function Game2048() {
  const [data, setData] = useState(_2048Logic.state);

  return <View className="py-8">
    <View className="flex justify-evenly mb-4">
      <Controls setData={setData} logicObj={_2048Logic} />
      <State data={data} />
    </View>
    <Frame setData={setData} logicObj={_2048Logic} />
  </View>
}

export default Game2048;

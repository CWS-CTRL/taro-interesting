import React from "react";
import { View, Text, Button } from "@tarojs/components";

import type { modeType } from "@/types/gameType";
import type { stateType } from "../../composables/types"

interface propsType {
  setData: Function;
  logicObj: {
    state: stateType;
    selectMode: Function;
  };
  timer: {
    reset: Function
  };
}

const mode: modeType[] = ["New", "Easy", "Medium", "Hard"];

function Controls(props: propsType) {
  const { setData, logicObj, timer } = props;

  return <View className="flex justify-evenly mb-4 text-xs">
    {mode.map(title =>
      <Button
        className="basis-14 btn-reset len-8 leading-6 bg-teal-500 text-white"
        key={title}
        onTap={() => {
          timer.reset();
          logicObj.selectMode(title);
          setData({ ...logicObj.state });
        }}>
        <Text className="text-xs">
          {title}
        </Text>
      </Button>)}
  </View>
}

export default Controls;

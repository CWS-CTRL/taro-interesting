import React from "react";

import { Text, Button } from "@tarojs/components";

import type { stateType } from "../../composables/types";

interface propsType {
  setData: Function;
  logicObj: {
    state: stateType;
    newGame: Function;
  }
}

function Controls(props: propsType) {
  const { setData, logicObj } = props;
  return <Button
    className="basis-14 btn-reset len-8 leading-6 bg-teal-500 text-white"
    onTap={() => {
      logicObj.newGame();
      setData({ ...logicObj.state })
    }}>
    <Text className="text-xs">
      New
    </Text>
  </Button>

}

export default Controls;

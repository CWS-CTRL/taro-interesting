import React from "react";

import { View, Text, Button } from "@tarojs/components";

import { stateType } from "../../composables/types";

interface propsType {
  setData: Function;
  logicObj: {
    state: stateType;
    onTap: Function;
    onLongPress: Function;
  };
  timer: {
    create: Function;
  }
}

const numColor = ["", "text-teal-300", "text-teal-400", "text-green-400", "text-green-600", "text-orange-400", "text-orange-600", "text-red-400", "text-red-600"]


function Frame(props: propsType) {
  const { setData, logicObj, timer } = props;
  const { state: { board, gameState } } = logicObj;

  return <View>
    {
      board.map((minesBlock, my) => (<View
        className="flex justify-center"
        key={my}>{minesBlock.map((mine, mx) => {
          const { isOpen, isMark, isDoubt, aroundMines, isMine, } = mine;
          return (<Button
            className="btn-reset len-8 leading-8"
            onTap={() => {
              gameState === "Ready" && timer.create();
              logicObj.onTap(mine);
              setData({ ...logicObj.state })
            }}
            onLongPress={() => {
              logicObj.onLongPress(mine);
              setData({ ...logicObj.state })
            }}
            key={`${mx}.${my}`}>{isOpen
              ? <View>{isMine
                ? <View className="w-full h-full bg-red-600"><Text className="text-lg iconfont icon-zhadan"></Text></View>
                : <Text className={`${numColor[aroundMines]}`}>{aroundMines > 0 ? aroundMines : ""}</Text>}</View>
              : <View className="w-full h-full bg-gray-300"><Text className={`text-lg iconfont ${isMark ? `icon-qizhi text-red-600` : isDoubt ? `icon-wenhao text-black` : ""}`} /></View>}
          </Button>
          )
        }
        )}</View>))
    }
  </View>
}

export default Frame;

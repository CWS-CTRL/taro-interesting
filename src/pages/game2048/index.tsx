import React, { useState, useRef, ComponentType } from "react";
import { View, Button, Text } from "@tarojs/components";
import type { ViewProps } from "@tarojs/components";

import GameState from "@/components/gameState";

import getSlipDirection from "@/utils/getSlipDirection";
import $2048Logic from "./composables/logic";

const _2048Logic = new $2048Logic();

let startPageXY = { pageX: 0, pageY: 0 };
let endPageXY = { pageX: 0, pageY: 0 };
const getPageXY = (e) => {
  const { pageX, pageY } = e.changedTouches[0]
  return {
    pageX, pageY
  }
}

function Game2048() {
  const [data, setData] = useState(_2048Logic.state);
  const { gameState, cards, score } = data;

  return <View className="py-8">
    <View className="flex justify-evenly mb-4">
      <Button className="basis-14 btn-reset len-8 leading-6 bg-teal-500 text-white" onTap={() => { _2048Logic.newGame(); setData({ ..._2048Logic.state }) }}><Text className="text-xs">New</Text></Button>
      <GameState gameState={gameState} />
      <View><Text className="text-2xl">得分：{score}</Text></View>
    </View>    <View
      className="grid grid-cols-3 grid-cols-3 w-full gap-2 box-border mt-10 p-2 bg-slate-200"
      onTouchStart={(e) => {
        startPageXY = getPageXY(e);
      }}

      onTouchEnd={(e) => {
        endPageXY = getPageXY(e);
        const direction = getSlipDirection(startPageXY, endPageXY);
        if (direction) {
          _2048Logic.onTouchEnd(direction);
          setData({ ..._2048Logic.state });
        }

      }}
    >{cards.map(cardsRow => cardsRow.map(({ context, isNew }) => <View className={`grid place-content-center full aspect-square font-bold text-3xl  bg-2048-${context || `default`}  ${isNew ? `scale01` : ``}`}><View>{context}</View></View>))}</View>
  </View>
}

export default Game2048;

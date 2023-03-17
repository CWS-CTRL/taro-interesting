import React from "react";

import { View } from "@tarojs/components";

import getSlipDirection from "@/utils/getSlipDirection";

import type { stateType } from "../../composables/types";

import "../../index.css"

let startPageXY = { pageX: 0, pageY: 0 };
let endPageXY = { pageX: 0, pageY: 0 };
const getPageXY = (e) => {
  const { pageX, pageY } = e.changedTouches[0]
  return {
    pageX, pageY
  }
}

interface propsType {
  setData: Function;
  logicObj: {
    state: stateType;
    onTouchEnd: Function;
  }
}

function Frame(props: propsType) {
  const { setData, logicObj } = props;
  const { cards } = logicObj.state;

  return <View
    className="grid grid-cols-4 grid-cols-4 w-full gap-4 box-border mt-10 p-2"
    onTouchStart={(e) => {
      startPageXY = getPageXY(e);
    }}
    onTouchEnd={(e) => {
      endPageXY = getPageXY(e);
      const direction = getSlipDirection(startPageXY, endPageXY);
      if (direction) {
        logicObj.onTouchEnd(direction);
        setData({ ...logicObj.state });
      }
    }}
  >{cards.map(cardsRow => cardsRow.map(({ context, isNew }) =>
    <View
      className={`grid place-content-center full aspect-square font-bold text-2xl shadow-xl bg-2048-${context || `default`}  ${isNew ? `scale01` : ``}`}>
      <View>
        {context}
      </View>
    </View>))}
  </View>

}

export default Frame;

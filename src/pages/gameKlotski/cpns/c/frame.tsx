import React from "react";

import { View, Button } from "@tarojs/components";

import type { stateType } from "../../composables/types";

interface propsType {
  setData: Function;
  logicObj: {
    state: stateType;
    onTap: Function;
  };
  timer: {
    create: Function;
  }
}

const containerClass = [, , "grid-cols-2 grid-rows-2", "grid-cols-3 grid-rows-3", "grid-cols-4 grid-rows-4", "grid-cols-5 grid-rows-5", "grid-cols-6 grid-rows-6"];

function Frame(props: propsType) {
  const { setData, logicObj, timer } = props;
  const { board, gameState, width } = logicObj.state;

  return <View
    className={`grid ${containerClass[width]} border-default`}>{
      board.map((blocks, x) =>
        blocks.map(({ context }, y) => (
          <View
            key={context}>{context ? <Button
              className="grid place-content-center btn-reset full aspect-square bg-red-200"
              onTap={() => {
                gameState === "Ready" && timer.create();
                logicObj.onTap({ x, y })
                setData({ ...logicObj.state });
              }}>
              <View
                className="text-4xl font-bold">
                {context}
              </View>
            </Button>
              : ""}
          </View>
        ))
      )
    }</View>
}

export default Frame;

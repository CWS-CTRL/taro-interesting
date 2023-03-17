import React from "react";
import { useLoad, useUnload, createCanvasContext } from "@tarojs/taro";
import useScreenWH from "@/hooks/useScreenWH";

import { Canvas } from "@tarojs/components";

import ControlsFn from "@/utils/controlsFn";
import randomColor from "@/utils/randomColor";

import MoveCircle from "@/canvas/moveCircle/moveCircle";

const controlsFn = new ControlsFn();

function CanvasCollision() {
  const { w, h } = useScreenWH()

  useLoad(() => {
    const ctx = createCanvasContext("canvas");
    const circle = new MoveCircle({ ctx, width: w, height: 384, radius: 10, randomXY: true, randomColor: true, randomSpeed: true });
    circle.collision(() => { circle.color = randomColor() });
    const move = () => {
      circle.move();
      circle.draw();
    };

    controlsFn.init(move);
    controlsFn.continue();
  });

  useUnload(() => {
    controlsFn.pause();
  });

  return <Canvas className="w-full h-96 border-default" id="canvas" canvasId="canvas" />
}

export default CanvasCollision;

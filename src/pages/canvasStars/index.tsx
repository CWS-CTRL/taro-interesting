import React from "react";
import { useLoad, createCanvasContext, createInnerAudioContext } from "@tarojs/taro";
import { View, Canvas } from "@tarojs/components";
import useScreenWH from "@/hooks/useScreenWH";
import StarsLogic from "./composables/logic";

const starsLogic = new StarsLogic();

function CanvasSquare() {
  const { w, h } = useScreenWH()

  useLoad(() => {
    const ctx = createCanvasContext("canvas");
    starsLogic.init(ctx, w, 384);
    starsLogic.drawStats();
    starsLogic.moveStars();
  })

  return <Canvas className="w-full h-96 border-default" id="canvas" canvasId="canvas" />
}

export default CanvasSquare;

import React from "react";
import { useLoad, createCanvasContext } from "@tarojs/taro";
import useScreenWH from "@/hooks/useScreenWH";

import { View, Canvas, Button } from "@tarojs/components";
import PlumLogic from "./composables/logic";

const plumLogic = new PlumLogic();

function CanvasPlum() {
  const { w, h } = useScreenWH();
  useLoad(() => {
    const ctx = createCanvasContext("canvas");
    plumLogic.init(ctx, w, 384)
    ctx.draw(true);
  })

  return <View>
    <Canvas className="w-full h-96 border-default" id="canvas" canvasId="canvas" />
    <Button onTap={(() => { plumLogic.reset() })}>reset</Button>
  </View>
}

export default CanvasPlum;



import React from "react";
import { createCanvasContext, useReady, createInnerAudioContext } from "@tarojs/taro";
import { View, Canvas } from "@tarojs/components";
import useScreenWH from "@/hooks/useScreenWH";
import SquareLogic from "./composables/logic";

function CanvasSquare() {
  const { w, h } = useScreenWH()

  useReady(() => {
    const squares: any[] = [];
    const ctx = createCanvasContext("canvas");
    const colors = ["#FFAC3F", "#FEFF00", "#E140FB", "#67EDAC", "#41C4FF"];
    for (let i = 0; i < 5; i++) {
      squares.push(new SquareLogic(ctx, Math.floor(w / 5) * i + 8, 0, 50, colors[i], 1.5 - Math.pow(i - 2, 2) * 0.3));
    }

    requestAnimationFrame(() => {
      ctx.clearRect(0, 0, 320, 504);
      for (let i = 0; i < squares.length; i++) {
        squares[i].move();
        squares[i].drawSquare();
        squares[i].drawGrid();
      }
      ctx.draw();
    })

    const innerAudioContext = createInnerAudioContext();
    innerAudioContext.autoplay = true
    innerAudioContext.src = 'https://ch-sycdn.kuwo.cn/653ac69dfc30cbbacdea52a0ae47f94d/64077cea/resource/n2/7/5/3029570458.mp3'
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.loop = true;
    innerAudioContext.volume = 0.2;
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
  })

  return <Canvas className="screen" id="canvas" canvasId="canvas" />
}

export default CanvasSquare;

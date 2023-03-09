import React from "react";
import { useDidShow, createCanvasContext, createInnerAudioContext } from "@tarojs/taro";
import { View, Canvas } from "@tarojs/components";
import useScreenWH from "@/hooks/useScreenWH";
import SquareLogic from "./composables/logic";

function CanvasSquare() {
  const { w, h } = useScreenWH()

  useDidShow(() => {
    const squares: any[] = [];
    const ctx = createCanvasContext("canvas");
    const len = 50;
    const colors = ["#FFAC3F", "#FEFF00", "#E140FB", "#67EDAC", "#41C4FF"];
    const offsetX = Math.floor((w - len * 5) / 2)
    for (let i = 0; i < 5; i++) {
      squares.push(new SquareLogic(ctx, offsetX + len * i, 0, len, colors[i], 0.6 - Math.pow(i - 2, 2) * 0.1));
    }

    let count = 0;
    (function move() {
      requestAnimationFrame(() => {
        ctx.clearRect(0, 0, 320, 504);
        count++;
        if (count % 6 === 0) {
          for (let i = 0; i < squares.length; i++) {
            squares[i].move();
            squares[i].drawSquare();
            squares[i].drawGrid();
          }
          ctx.draw();
        }
      });
      move();
    })();

    // const innerAudioContext = createInnerAudioContext();
    // innerAudioContext.autoplay = true
    // innerAudioContext.src = 'https://ch-sycdn.kuwo.cn/653ac69dfc30cbbacdea52a0ae47f94d/64077cea/resource/n2/7/5/3029570458.mp3'
    // innerAudioContext.onPlay(() => {
    //   console.log('开始播放')
    // })
    // innerAudioContext.loop = true;
    // innerAudioContext.volume = 0.2;
    // innerAudioContext.onError((res) => {
    //   console.log("错误");

    //   console.log(res.errMsg)
    //   console.log(res.errCode)
    // })
  })

  return <Canvas className="screen mt-16" id="canvas" canvasId="canvas" />
}

export default CanvasSquare;

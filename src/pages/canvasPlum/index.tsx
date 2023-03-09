import React, { useState } from "react";
import { useLoad, useUnload, useDidShow, createCanvasContext } from "@tarojs/taro";
import type { CanvasContext } from "@tarojs/taro";
import useScreenWH from "@/hooks/useScreenWH";
import { View, Canvas, Button } from "@tarojs/components";


// interface pointType {
//   x: number;
//   y: number;
// }

// interface branchType {
//   start: pointType;
//   len: number;
//   angle: number;
// }



let ctx: CanvasContext;
let init: Function;

function CanvasPlum() {
  useDidShow(() => {
    ctx = createCanvasContext("canvas");
    let steps: Function[] = [];
    let prevSteps: Function[] = [];
    let len = 5;
    let deps = 5;
    let _deps = 0;
    let count = 0;

    function getNextPoint(x: number, y: number, length: number, angle: number) {
      return {
        nx: x + Math.cos(angle) * length,
        ny: y + Math.sin(angle) * length
      }
    }

    function step(x: number, y: number, angle: number) {
      const length = Math.random() * len;
      const { nx, ny } = getNextPoint(x, y, length, angle);
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(nx, ny);
      ctx.stroke();
      ctx.draw(true);

      const angle1 = angle + Math.random() * Math.PI / 24;
      const angle2 = angle - Math.random() * Math.PI / 24;

      if (_deps <= 5 || Math.random() < 0.5) {
        steps.push(() => step(nx, ny, angle1));
      }

      if (_deps <= 5 || Math.random() < 0.5) {
        steps.push(() => step(nx, ny, angle2));
      }
    }

    function frame() {
      if (!steps.length) return;
      count++;

      requestAnimationFrame(() => {
        if (count % 3 == 0) {
          prevSteps = steps;
          steps = [];
          _deps++;
          prevSteps.forEach(i => i());
        }
        frame();
      })

    }

    init = function () {
      _deps = 0;
      ctx.clearRect(0, 0, 1000, 1000);
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#000000";
      steps = Math.random() < 0.5
        ?
        [() => step(0, Math.random() * 384, 0), () => step(300, Math.random() * 384, Math.PI / 2)]
        :
        [() => step(Math.random() * 300, 0, Math.PI / 4), () => step(Math.random() * 300, 384, -Math.PI / 4)];

      frame()
    }

    init();
  })



  return <View>
    <Canvas className="w-full h-96 border-default" id="canvas" canvasId="canvas" />
    <Button onTap={(() => { init() })}>reset</Button>
  </View>
}

export default CanvasPlum;



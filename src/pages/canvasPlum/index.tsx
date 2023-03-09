import React, { useState } from "react";
import { useLoad, useUnload, useDidShow, createCanvasContext } from "@tarojs/taro";
import useScreenWH from "@/hooks/useScreenWH";
import { View, Canvas } from "@tarojs/components";

interface Point {
  x: number
  y: number
}
interface Branch {
  start: Point
  length: number
  theta: number
}

function CanvasPlum() {
  const [data, setData] = useState([]);

  useDidShow(() => {

    const ctx = createCanvasContext("canvas");

    function init() {
      ctx.strokeStyle = '#000000'
      step({
        start: { x: 0, y: 0 },
        length: 10,
        theta: Math.PI / 4,
      })
    }
    let pendingTasks: Function[] = []
    function step(b: Branch, depth = 0) {
      const end = getEndPoint(b)
      drawBranch(b)
      if (depth < 4 || Math.random() < 0.5) {
        pendingTasks.push(() => {
          step({
            start: end,
            length: b.length + (Math.random() * 2 - 1),
            theta: b.theta - 0.2 * Math.random(),
          }, depth + 1)
        })
      }
      if (depth < 4 || Math.random() < 0.5) {
        pendingTasks.push(() => {
          step({
            start: end,
            length: b.length + (Math.random() * 2 - 1),
            theta: b.theta + 0.2 * Math.random(),
          }, depth + 1)
        })
      }
    }
    function frame() {
      const tasks: Function[] = []
      pendingTasks = pendingTasks.filter((i) => {
        if (Math.random() > 0.4) {
          tasks.push(i)
          return false
        }
        return true
      })
      tasks.forEach(fn => fn())
    }
    let framesCount = 0
    function startFrame() {
      requestAnimationFrame(() => {
        framesCount += 1
        if (framesCount % 3 === 0)
          frame()
        startFrame()

      })
    }
    startFrame()
    function lineTo(p1: Point, p2: Point) {
      ctx.beginPath()
      ctx.moveTo(p1.x, p1.y)
      ctx.lineTo(p2.x, p2.y)
      ctx.stroke()
      //保存上次绘画的结果，需传入参数true
      ctx.draw(true)
    }
    function getEndPoint(b: Branch): Point {
      return {
        x: b.start.x + b.length * Math.cos(b.theta),
        y: b.start.y + b.length * Math.sin(b.theta),
      }
    }
    function drawBranch(b: Branch) {
      lineTo(b.start, getEndPoint(b))
    }
    init();
  })

  return <Canvas className="w-full h-96 border-default" id="canvas" canvasId="canvas" />
}

export default CanvasPlum;



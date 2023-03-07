import React, { useState, useEffect } from "react";
import Taro from "@tarojs/taro";

function useScreenWH() {
  const { screenWidth, screenHeight } = Taro.getSystemInfoSync();
  const [screenWH, setScreensWH] = useState({
    w: screenWidth,
    h: screenHeight
  })

  useEffect(() => {
    const updateSize = () => {
      const { screenWidth, screenHeight } = Taro.getSystemInfoSync();


      setScreensWH({
        w: screenWidth,
        h: screenHeight
      })
    };
    window.addEventListener("resize", updateSize);

    return () => {
      window.removeEventListener("resize", updateSize);
    }
  })

  return screenWH
}

export default useScreenWH;

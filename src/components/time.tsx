import React, { useState, useEffect, useLayoutEffect } from "react";

import { View, Text } from "@tarojs/components";
import getSeconds from "@/utils/getSeconds";

function Time(props) {
  const { isGo, t } = props
  const [, setTime] = useState([]);

  useEffect(() => {
    const _t = setInterval(() => {
      if (isGo) {
        setTime([]);
      }
    }, 1000);

    return (() => {
      clearInterval(_t);
    })
  });

  return <View><Text className="iconfont icon-miaobiao text-2xl" /><Text>{t.getSec()}</Text></View>
}

export default Time;

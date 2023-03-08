import React from "react";

import { View, Text, Navigator, Button } from "@tarojs/components";

import canvasTabData from "@/assets/data/canvasTab";
import "./index.scss";

function CanvasSundry() {
  return <View>
    {
      canvasTabData.map(item => (<Navigator url={item.path} key={item.path}>
        <Button>{item.title}</Button>
      </Navigator>))
    }
  </View>
};

export default CanvasSundry;



import React from "react";

import { View, Text, Navigator, Button } from "@tarojs/components";

import gameTabData from "@/assets/data/gameTab";

import "./index.scss";

function GameSundry() {
  return <View>
    {
      gameTabData.map(item => (<Navigator url={item.path} key={item.path}>
        <Button>{item.title}</Button>
      </Navigator>))
    }
  </View>
};

export default GameSundry;



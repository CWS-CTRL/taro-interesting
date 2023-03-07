import React from "react";

import { View, Text, Button } from "@tarojs/components"

interface propsType {
  className: string,
  onTap: Function
}

function Refresh(props: propsType) {
  const { className, onTap } = props;

  return <Button className={`btn-reset len-8 leading-8 ${className}`} onTap={onTap}><Text className="text-2xl iconfont icon-shuaxin"></Text></Button>
}

export default Refresh;

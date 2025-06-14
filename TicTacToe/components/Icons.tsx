import {View, Text, Animated} from 'react-native';
import type {PropsWithChildren} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import React from 'react';

type IconProps = PropsWithChildren<{
  name: string;
  animation?: Animated.Value;
}>;
const Icons = ({name,animation}: IconProps) => {
  const icon = (()=>{
    switch (name) {
    case 'circle':
      return <Icon name="circle-thin" size={38} color="#F7CD2E" />;
      break;
    case 'cross':
      return <Icon name="times" size={38} color="#38CC&&" />;
      break;
    case 'win':
      return <Icon name="trophy" size={38} color="#38CC77" />;
      break;
    default:
      return <Icon name="pencil" size={38} color="gray" />;
  }
})();
if(animation){
  return(
    <Animated.View style={{opacity: animation, transform: [{scale: animation}] }}>
      {icon}
    </Animated.View>
  )
}
return icon;
};

export default Icons;

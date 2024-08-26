
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const ButtonComponent = ({ onPress, title, style, textStyle }: any) => {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonComponent;

import React from 'react';
import { TouchableHighlight, Image } from 'react-native';

const ActionButton = ({
  containerStyle = {},
  iconStyle = {},
  onPress = () => {},
  source,
}) => {
  return (
    <TouchableHighlight style={containerStyle} onPress={onPress}>
      <Image style={iconStyle} source={source} />
    </TouchableHighlight>
  );
};

export default ActionButton;

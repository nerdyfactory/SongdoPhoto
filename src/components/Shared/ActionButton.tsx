/**
 * @format
 */

import React from 'react';
import {
  TouchableOpacity,
  Image,
  StyleProp,
  ViewStyle,
  ImageStyle,
  GestureResponderEvent,
} from 'react-native';

export interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<ImageStyle>;
  onPress?: (event: GestureResponderEvent) => void;
  source: number;
}

const ActionButton = ({
  containerStyle = {},
  iconStyle = {},
  onPress,
  source,
}: Props) => {
  return (
    <TouchableOpacity style={containerStyle} onPress={onPress}>
      <Image style={iconStyle} source={source} />
    </TouchableOpacity>
  );
};

export default ActionButton;

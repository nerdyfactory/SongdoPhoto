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
import BasicButton from './BasicButton';

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
    <BasicButton style={containerStyle} onPress={onPress}>
      <Image style={iconStyle} source={source} />
    </BasicButton>
  );
};

export default ActionButton;

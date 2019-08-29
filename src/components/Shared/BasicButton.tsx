/**
 * @format
 */

import React, { ReactNode } from 'react';
import {
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  GestureResponderEvent,
} from 'react-native';

export interface Props {
  style?: StyleProp<ViewStyle>;
  onPress?: (event: GestureResponderEvent) => void;
  children: React.ReactNode;
}

const BasicButton = ({ style = {}, onPress, children }: Props) => {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

export default BasicButton;

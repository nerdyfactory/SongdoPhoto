/**
 * @format
 * @flow
 */

import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import type { PressEvent } from 'react-native/Libraries/Types/CoreEventTypes';
import type {
  ViewStyleProp,
  ImageStyleProp,
} from 'react-native/Libraries/StyleSheet/StyleSheet';

const ActionButton = ({
  containerStyle = {},
  iconStyle = {},
  onPress = () => {},
  source,
}: {
  containerStyle?: ViewStyleProp,
  iconStyle?: ImageStyleProp,
  onPress: (event: PressEvent) => void,
  source: number,
}) => {
  return (
    <TouchableOpacity style={containerStyle} onPress={onPress}>
      <Image style={iconStyle} source={source} />
    </TouchableOpacity>
  );
};

export default ActionButton;

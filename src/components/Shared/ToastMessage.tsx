/**
 * @format
 */

import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Keyboard, Animated } from 'react-native';
import Colors from '../../theme/Colors';
import Fonts from '../../theme/Fonts';
import { useMessage } from '../../contexts/MessageContext';

export default function ToastMessage() {
  const [fadeAnim, setFadeAnim] = useState(new Animated.Value(-100));

  useEffect(() => {
    Keyboard.dismiss();
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
      }),
      Animated.timing(fadeAnim, {
        toValue: -100,
        duration: 600,
        delay: 2000,
      }),
    ]).start();
  });

  const [message] = useMessage();
  if (!message) {
    return null;
  }
  const { messageType, messageText } = message;

  const containerStyles = [
    styles.container,
    { bottom: fadeAnim },
    messageType === 'error' && styles.errorContainer,
    messageType === 'warning' && styles.warningContainer,
  ];
  const textStyles = [
    styles.text,
    messageType === 'warning' && styles.warningText,
  ];

  return (
    <Animated.View style={containerStyles}>
      <Text style={textStyles}>{messageText}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -100,
    minHeight: 69,
    maxHeight: 90,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 50,
    backgroundColor: Colors.windowsBlue,
    zIndex: 100,
  },
  errorContainer: {
    backgroundColor: Colors.coral,
  },
  warningContainer: {
    backgroundColor: Colors.dullYellow,
  },
  text: {
    color: Colors.white,
    fontSize: 14,
    ...Fonts.NunitoSansBold,
    textAlign: 'center',
  },
  warningText: {
    ...Fonts.NunitoSansLight,
    color: Colors.black,
  },
});

/**
 * @format
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';

import { PropsWithNavigation } from '../../Navigator';

export default function PhotoScreen({ navigation }: PropsWithNavigation) {
  const PhotoData = navigation.getParam('photoData');
  return <View />;
}

const styles = StyleSheet.create({});

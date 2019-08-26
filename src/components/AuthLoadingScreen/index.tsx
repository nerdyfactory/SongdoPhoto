/**
 * @format
 */
import React, { useState, useEffect } from 'react';

import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation';

export interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export default function AuthLoadingScreen({ navigation }: Props) {
  useEffect(() => {
    AsyncStorage.getItem('userToken').then(userToken => {
      navigation.navigate(userToken ? 'App' : 'Auth');
    });
  });

  return (
    <View>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  );
}

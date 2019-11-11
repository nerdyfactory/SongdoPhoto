/**
 * @format
 */
import React, { useEffect } from 'react';

import { ActivityIndicator, StatusBar, StyleSheet, View } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation';

import Firebase from '../../services/Firebase';

export interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export default function AuthLoadingScreen({ navigation }: Props) {
  useEffect(() => {
    navigation.navigate(Firebase.auth().currentUser ? 'App' : 'Auth');
  });
  return (
    <View>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  );
}

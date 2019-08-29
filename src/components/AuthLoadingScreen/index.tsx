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
import firebase from 'react-native-firebase';

export interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export default function AuthLoadingScreen({ navigation }: Props) {
  useEffect(() => {
    const { currentUser } = firebase.auth();
    console.log(currentUser);
    navigation.navigate(currentUser ? 'App' : 'Auth');
  });
  return (
    <View>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  );
}

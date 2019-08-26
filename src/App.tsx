/**
 * @format
 */

import React, { Fragment, PureComponent } from 'react';
import { View, StyleSheet, Linking, AppState } from 'react-native';
import Navigator from './Navigator';
import ToastMessage from './components/Shared/ToastMessage';

export default function App() {
  return (
    <View style={styles.container}>
      <Navigator />
      <ToastMessage />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(212, 236, 246)',
  },
});

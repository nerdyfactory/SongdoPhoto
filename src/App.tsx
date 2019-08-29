/**
 * @format
 */

import React, { Fragment, PureComponent } from 'react';
import { View, StyleSheet, Linking, AppState } from 'react-native';
import Navigator from './Navigator';
import ToastMessage from './components/Shared/ToastMessage';
import { AuthProvider } from './contexts/AuthContext';
import { MessageProvider } from './contexts/MessageContext';

export default function App() {
  return (
    <View style={styles.container}>
      <MessageProvider>
        <AuthProvider>
          <Navigator />
        </AuthProvider>
        <ToastMessage />
      </MessageProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

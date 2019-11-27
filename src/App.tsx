/**
 * @format
 */

import React, { Fragment, PureComponent } from 'react';
import { View, StyleSheet, Linking, AppState } from 'react-native';
import Navigator from './Navigator';
import ToastMessage from './components/Shared/ToastMessage';
import { AuthProvider } from './contexts/AuthContext';
import { MessageProvider } from './contexts/MessageContext';

const App = () => (
  <View style={styles.container}>
    <MessageProvider>
      <AuthProvider>
        <Navigator />
      </AuthProvider>
      <ToastMessage />
    </MessageProvider>
  </View>
);

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

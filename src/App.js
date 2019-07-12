/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {
  StatusBar,
  StyleSheet,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';


const App = () => {
  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />

      <MapView
         provider={PROVIDER_GOOGLE}
         style={styles.map}
      />
    </Fragment>
  );
};

const styles = StyleSheet.create({
  map: { flex:1 }
});

export default App;

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment, PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import ActionButton from './components/ActionButton';
const AddIcon = require('./assets/images/002-add.png');

export default class App extends PureComponent {
  onPressAdd = () => {
  };

  render() {
    return (
      <Fragment>
        <MapView provider={PROVIDER_GOOGLE} style={styles.container} />
        <View style={styles.bottom}>
          <ActionButton
            containerStyle={styles.buttonContainer}
            source={AddIcon}
            onPress={this.onPressAdd}
          />
        </View>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  bottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },
  buttonContainer: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    backgroundColor: 'darkgray',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

/**
 * @format
 */

import React, { Fragment, PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import ImagePicker from 'react-native-image-picker';
import Geolocation from '@react-native-community/geolocation';

import ActionButton from '../Shared/ActionButton';
const AddIcon = require('../../assets/images/002-add.png');

interface State {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export default class MapScreen extends PureComponent<{}, State> {
  public state = {
    latitude: 37.5610336,
    longitude: 126.9795475,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  public componentDidMount() {
    Geolocation.getCurrentPosition(({ coords }) => {
      const { longitude, latitude } = coords;
      this.setState({ longitude, latitude });
    });
  }

  private onPressAdd = () => {
    const options = {
      title: 'Select a picture',
      noData: true,
      storageOptions: {
        skipBackup: true,
        path: 'songdophoto',
        cameraRoll: true,
      },
    };

    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
    });
  };

  private onRegionChange = ({
    longitude,
    latitude,
  }: {
    longitude: number;
    latitude: number;
  }) => {
    console.log(longitude, latitude);
  };

  public render() {
    const { longitude, latitude, longitudeDelta, latitudeDelta } = this.state;
    console.log(longitude + ',' + latitude);
    return (
      <Fragment>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.container}
          region={{
            longitude,
            latitude,
            longitudeDelta,
            latitudeDelta,
          }}
          onRegionChange={this.onRegionChange}
        />
        <Marker
          coordinate={{ latitude, longitude }}
          title={'11111111111'}
          description={'aaaaaaaaaa'}
          image={AddIcon}
        />
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

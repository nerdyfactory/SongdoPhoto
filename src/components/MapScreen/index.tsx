/**
 * @format
 */

import React, { Fragment, useState } from 'react';
import {
  StyleSheet,
  View,
  Platform,
  Image,
  TouchableOpacity,
} from 'react-native';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Region,
  EventUserLocation,
} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import ImagePicker from 'react-native-image-picker';

import ActionButton from '../Shared/ActionButton';
const AddIcon = require('../../assets/images/add.png');
const CursorIcon = require('../../assets/images/cursor.png');
const LocationUpdateIcon = require('../../assets/images/location-update.png');

interface State {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

const MapScreen = (Props: {}) => {
  const [location, setLocation] = useState({
    updated: false,
    latitude: 37.5610336,
    longitude: 126.9795475,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const onPressAdd = () => {
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
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.error('ImagePicker Error: ', response.error);
      } else {
        console.log(response);
      }
    });
  };

  const onRegionChangeComplete = (coords: Region) => {
    setLocation({
      ...location,
      ...coords,
    });
  };

  const onUserLocationChange = ({ nativeEvent }: EventUserLocation) => {
    // update user location once
    if (location.updated) {
      return;
    }
    const { coordinate } = nativeEvent;
    setLocation({
      ...location,
      updated: true,
      longitude: coordinate.longitude,
      latitude: coordinate.latitude,
    });
  };

  let onRefresh = false;

  const onRefreshLocation = () => {
    if (onRefresh) {
      return;
    }
    onRefresh = true;
    Geolocation.getCurrentPosition(
      ({ coords }) => {
        const { longitude, latitude } = coords;
        setLocation({
          ...location,
          longitude,
          latitude,
        });
        onRefresh = false;
      },
      error => {
        // See error code charts below.
        console.error(error.code, error.message);
        onRefresh = false;
      },
      { enableHighAccuracy: true, timeout: 1500, maximumAge: 1000 },
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={location}
          onRegionChangeComplete={onRegionChangeComplete}
          rotateEnabled={false}
          showsUserLocation={true}
          onUserLocationChange={onUserLocationChange}
        />
        <AddButton onPress={onPressAdd} />
        <ActionButton
          containerStyle={styles.myLocation}
          source={LocationUpdateIcon}
          iconStyle={styles.myLocationIcon}
          onPress={onRefreshLocation}
        />
      </View>
    </View>
  );
};

MapScreen.navigationOptions = {
  title: 'map',
};

const AddButton = ({ onPress }: { onPress: () => void }) => (
  <View style={styles.cursorContainer}>
    <TouchableOpacity onPress={onPress} style={styles.cursor}>
      <Image source={CursorIcon} style={styles.cursorIcon} />
    </TouchableOpacity>
  </View>
);

export default MapScreen;

const styles = StyleSheet.create({
  mapContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    zIndex: 0,
    alignSelf: 'stretch',
    flex: 1,
    borderColor: 'black',
  },
  cursorContainer: {
    position: 'absolute',
    zIndex: 1,
    height: 86,
    width: 28,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  cursor: {
    width: 28,
    height: 43,
  },
  cursorIcon: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  myLocation: {
    position: 'absolute',
    right: 30,
    bottom: 30,
  },
  myLocationIcon: {
    width: 30,
    height: 30,
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
  },
  addContainer: {
    opacity: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addIcon: {
    width: 60,
    height: 60,
  },
});

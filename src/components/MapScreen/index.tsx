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

import { uploadPhoto, getPhotos } from '../../services/Firebase';

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

let eventCounter = 0;

const MapScreen = (Props: {}) => {
  const [location, setLocation] = useState({
    updated: false,
    latitude: 37.5610336,
    longitude: 126.9795475,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [photos, setPhotos] = useState(Array());

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
        uploadPhoto(response, location).then(res => {
          console.log(res);
        });
      }
    });
  };

  const onRegionChangeComplete = (coords: Region) => {
    setLocation({
      ...location,
      ...coords,
    });
    eventCounter += 1;
    const { longitude, latitude, longitudeDelta, latitudeDelta } = coords;
    const lngDelta = longitudeDelta / 2;
    const latDelta = latitudeDelta / 2;
    const start = {
      longitude: longitude - lngDelta,
      latitude: latitude - latDelta,
    };
    const end = {
      longitude: longitude + lngDelta,
      latitude: latitude + latDelta,
    };
    getPhotos(start, end).then(docs => {
      eventCounter -= 1;
      if (eventCounter === 0) {
        // update view if there is no pending query
        setPhotos(docs);
      }
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
        console.log(coords);
        setLocation({
          ...location,
          longitude: coords.longitude,
          latitude: coords.latitude,
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
          showsMyLocationButton={false}>
          {photos.map(p => (
            <Marker
              key={p.id}
              coordinate={{
                longitude: p.location.longitude,
                latitude: p.location.latitude,
              }}>
              <Image
                key={p.metadata.fullpath}
                source={{ uri: p.imageUrl }}
                style={styles.photo}
              />
            </Marker>
          ))}
        </MapView>
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
  photo: {
    width: 60,
    height: 60,
  },
});

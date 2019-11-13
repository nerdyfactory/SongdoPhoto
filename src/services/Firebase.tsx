/*
 * @format
 */

import firebase from '@react-native-firebase/app';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { Platform } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

const Firebase = {
  firebase,
  firestore,
  storage,
  auth,
};

interface Location {
  latitude: number;
  longitude: number;
}

const uploadPhoto = (
  { uri, fileName }: { uri: string; fileName?: string },
  location: Location,
) => {
  const { currentUser } = auth();
  const userPath = currentUser ? currentUser.uid : 'anonymous';
  const storageRef = storage()
    .ref()
    .child(`images/${userPath}/${fileName}`);

  return getPathForFirebaseStorage(uri)
    .then(path => storageRef.putFile(path))
    .then(task => savePhotoInfo(task, location))
    .catch(e => console.error(e));
};

const savePhotoInfo = (
  task: FirebaseFirestoreTypes.Task,
  location: Location,
) => {
  const { currentUser } = auth();
  const { metadata } = task;
  const photosRef = firestore().collection('photos');
  return photosRef.add({
    uid: currentUser ? currentUser.uid : null,
    metadata,
    location: new firebase.firestore.GeoPoint(
      location.latitude,
      location.longitude,
    ),
  });
};

const getPathForFirebaseStorage = async (uri: string): Promise<string> => {
  if (Platform.OS === 'ios') {
    return Promise.resolve(uri);
  }
  return RNFetchBlob.fs.stat(uri).then(stat => stat.path);
};

export { FirebaseAuthTypes, uploadPhoto };

export default Firebase;

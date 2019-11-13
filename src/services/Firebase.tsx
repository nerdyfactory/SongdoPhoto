/*
 * @format
 */

import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
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

const uploadPhoto = ({ uri, fileName }: { uri: string; fileName?: string }) => {
  const { currentUser } = auth();
  const storageRef = storage()
    .ref()
    .child(`images/${fileName}`);

  return getPathForFirebaseStorage(uri)
    .then(path => storageRef.putFile(path))
    .catch(e => console.error(e));
};

const getPathForFirebaseStorage = async (uri: string): Promise<string> => {
  if (Platform.OS === 'ios') {
    return Promise.resolve(uri);
  }
  return RNFetchBlob.fs.stat(uri).then(stat => stat.path);
};

export { FirebaseAuthTypes, uploadPhoto };

export default Firebase;

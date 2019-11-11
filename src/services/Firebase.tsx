/*
 * @format
 */

import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

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
  return storageRef.putFile(uri);
};

export { FirebaseAuthTypes, uploadPhoto };

export default Firebase;

/*
 * @format
 */

import firebase from '@react-native-firebase/app';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import storage, { FirebaseStorageTypes } from '@react-native-firebase/storage';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { Platform } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import GeolocationService from './Geolocation';

const FirebaseService = {
  firebase,
  firestore,
  storage,
  auth,
};

interface Location {
  latitude: number;
  longitude: number;
}

export interface PhotoData {
  uid: string | null;
  metadata: FirebaseStorageTypes.FullMetadata;
  location: FirebaseFirestoreTypes.GeoPoint;
  utm: string;
  id: string;
  imageUrl?: string;
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
  task: FirebaseStorageTypes.TaskSnapshot,
  location: Location,
) => {
  const { currentUser } = auth();
  const { metadata } = task;
  const photosRef = firestore().collection('photos');
  const { latitude, longitude } = location;
  return photosRef.add({
    uid: currentUser ? currentUser.uid : null,
    metadata,
    location: new firestore.GeoPoint(latitude, longitude),
    utm: GeolocationService.toUtm(latitude, longitude),
  });
};

const getPhotos = (start: Location, end: Location): Promise<PhotoData[]> => {
  const startPoint = new firestore.GeoPoint(start.latitude, start.longitude);
  const endPoint = new firestore.GeoPoint(end.latitude, end.longitude);
  return firestore()
    .collection('photos')
    .where('location', '>=', startPoint)
    .where('location', '<=', endPoint)
    .get()
    .then(snapshots => {
      const ret: PhotoData[] = [];
      snapshots.forEach(doc => {
        const data = doc.data();
        if (!data) {
          return;
        }
        const { uid, metadata, location, utm } = data;
        ret.push({ uid, metadata, location, utm, id: doc.id });
      });
      return Promise.all(
        ret.map(photoData =>
          storageUrl(photoData.metadata).then(imageUrl => ({
            ...photoData,
            imageUrl,
          })),
        ),
      );
    });
};

const storageUrl = (
  metadata: FirebaseStorageTypes.FullMetadata,
): Promise<string> =>
  storage()
    .ref(metadata.fullPath)
    .getDownloadURL();

const getPathForFirebaseStorage = async (uri: string): Promise<string> => {
  if (Platform.OS === 'ios') {
    return Promise.resolve(uri);
  }
  return RNFetchBlob.fs.stat(uri).then(stat => stat.path);
};

export { FirebaseAuthTypes, uploadPhoto, getPhotos };

export default FirebaseService;

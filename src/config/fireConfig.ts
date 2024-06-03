import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getReactNativePersistence, initializeAuth } from "firebase/auth";
import { Timestamp, getFirestore } from "firebase/firestore";
import {
  getDownloadURL, getStorage, listAll, ref,
  uploadBytesResumable
} from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAKThMdv5mG-OkaJrG8hlxNM0cEyEV9OVY",
  authDomain: "fir-test-d91ff.firebaseapp.com",
  projectId: "fir-test-d91ff",
  storageBucket: "fir-test-d91ff.appspot.com",
  messagingSenderId: "780080449796",
  appId: "1:780080449796:web:5b7159238f54e2c03ee851",
  measurementId: "G-JNZ7ZV4PXE"
};
export const serverStamp = Timestamp
const app = initializeApp(firebaseConfig);
export const FireAuth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)
export const storage = getStorage(app);

const listFiles = async () => {
  const listRef = ref(storage, "images");
  const listResp = await listAll(listRef);
  return listResp.items;
};
const uploadToFirebase = async (uri: string, name: string, onProgress: any) => {
  const fetchResponse = await fetch(uri);
  const theBlob = await fetchResponse.blob();
  const imageRef = ref(getStorage(), `images/${name}`);
  const uploadTask = uploadBytesResumable(imageRef, theBlob);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress && onProgress(progress);
      },
      (error) => {
        console.log(error);
        reject(error);
      },
      async () => {
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
        resolve({
          downloadUrl,
          metadata: uploadTask.snapshot.metadata,
        });
      }
    );
  });
};
export { listFiles, uploadToFirebase };


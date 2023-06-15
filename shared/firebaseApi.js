// import { firebaseApp, initApp } from "./firebaseApp";

// import { collection, doc, getDoc, getDocs, getFirestore } from "firebase/firestore";

import { child, ref as dref, get, getDatabase, push } from "firebase/database";
import {
  getDownloadURL,
  getStorage,
  ref as sref,
  uploadBytes,
} from "firebase/storage";

import { getBlob } from "../utils/blobUtil";
import { initializeApp } from "firebase/app";
import { randomUUID } from "expo-crypto";

const firebaseConfig = {
  apiKey: "AIzaSyCmis1kdFSad9hU23Pj8d64S281_BR627E",
  authDomain: "gvsu-marketplace.firebaseapp.com",
  projectId: "gvsu-marketplace",
  storageBucket: "gvsu-marketplace.appspot.com",
  messagingSenderId: "749426793103",
  appId: "1:749426793103:web:dd66416ec4ce080faf2efa",
  measurementId: "G-WPJTD1M192",
};

export const firebaseApp = initializeApp(firebaseConfig);

const storage = getStorage(firebaseApp);
export async function uploadImageAsync(uri) {
  const blob = await getBlob(uri);
  const storageRef = sref(storage, randomUUID());

  // 'file' comes from the Blob or File API
  const snapshot = await uploadBytes(storageRef, blob);
  const dUrl = await getDownloadURL(snapshot.ref);
  return dUrl;
}

export const saveProduct = async (data) => {
  const { url, ...payload } = data;
  const downloadUrl = await uploadImageAsync(data.url);
  const db = getDatabase();
  const res = await push(dref(db, "products/"), {
    ...payload,
    downloadUrl,
    timestamp: Date.now(),
  });
  return res;
};

export const getProducts = async () => {
  try {
    const dbRef = dref(getDatabase());
    const snapshot = await get(child(dbRef, `products/`));
    if (snapshot.exists()) {
      const data = snapshot?.val();
      const refinedData = Object.keys(data)
        .map((_id) => ({
          _id,
          ...data[_id],
        }))
        .sort((v1, v2) => v2.timestamp - v1.timestamp);
      console.log("values", refinedData);
      return refinedData;
    }
    return [];
  } catch (error) {
    console.log("getProducts:", error);
  }
};
// import { firebaseApp, initApp } from "./firebaseApp";

// import { collection, doc, getDoc, getDocs, getFirestore } from "firebase/firestore";

import { child, ref as dref, get, getDatabase, push, remove } from "firebase/database";
import {
  getDownloadURL,
  getStorage,
  ref as sref,
  uploadBytes,
} from "firebase/storage";

import { computeDistance } from "../utils/distanceUtil";
import { getBlob } from "../utils/blobUtil";
import { initializeApp } from "firebase/app";
import { uuidv4 } from "../utils/uuid";

const firebaseConfig = {
  apiKey: "AIzaSyCmis1kdFSad9hU23Pj8d64S281_BR627E",
  authDomain: "gvsu-marketplace.firebaseapp.com",
  databaseURL: "https://gvsu-marketplace-default-rtdb.firebaseio.com",
  projectId: "gvsu-marketplace",
  storageBucket: "gvsu-marketplace.appspot.com",
  messagingSenderId: "749426793103",
  appId: "1:749426793103:web:dd66416ec4ce080faf2efa",
  measurementId: "G-WPJTD1M192"
};

export const firebaseApp = initializeApp(firebaseConfig);

const storage = getStorage(firebaseApp);
export async function uploadImageAsync(uri) {
  const blob = await getBlob(uri);
  const storageRef = sref(storage, uuidv4());

  // 'file' comes from the Blob or File API
  const snapshot = await uploadBytes(storageRef, blob);
  const dUrl = await getDownloadURL(snapshot.ref);
  return dUrl;
}

export const saveProduct = async (data) => {
  let { images, ...payload } = data;
  images = images || [];
  const allImages$ = images.map(uploadImageAsync)
  const uploadedImages = await Promise.all(allImages$);
  const db = getDatabase();
  const res = await push(dref(db, "products/"), {
    ...payload,
    images: uploadedImages,
    timestamp: Date.now(),
  });
  return res;
};

export const removeProduct = async (product) => {
  const prodLocation = `products/${product.id}`;
  console.log(prodLocation);
  const db = getDatabase();
  return await remove(dref(db, prodLocation));
}

export const getProducts = async (location) => {
  try {
    const dbRef = dref(getDatabase());
    const snapshot = await get(child(dbRef, `products/`));
    if (snapshot.exists()) {
      const data = snapshot?.val();
      const refinedData = Object.keys(data)
        .map((id) => ({id, ...data[id], distance: computeDistance(location, data[id].location)}))
        .sort((v1, v2) => v2.timestamp - v1.timestamp);
      return refinedData;
    }
    return [];
  } catch (error) {
    console.log("getProducts:", error);
  }
};

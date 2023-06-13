import { getDatabase, onValue, push, ref } from "firebase/database";

import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyCmis1kdFSad9hU23Pj8d64S281_BR627E",
  authDomain: "gvsu-marketplace.firebaseapp.com",
  projectId: "gvsu-marketplace",
  storageBucket: "gvsu-marketplace.appspot.com",
  messagingSenderId: "749426793103",
  appId: "1:749426793103:web:dd66416ec4ce080faf2efa",
  measurementId: "G-WPJTD1M192"
};

export const initApp = () => {
    initializeApp(firebaseConfig)
}

export const writeToHistory = (data) => {
    const db = getDatabase();
    push(ref(db, 'history/'), { ...data, timestamp: Date.now() });
}

export const setupListnerForHistory = (callback) => {
    const db = getDatabase();
    const historyRef = ref(db, 'history/');
    onValue(historyRef, (snapshot) => {
      const data = snapshot?.val();
      if(data) {
        const refinedData = Object.keys(data).map( (_id) => ({
            _id,
            value: data[_id],
        }))
        .sort((v1, v2) => v2.value.timestamp - v1.value.timestamp)
        callback(refinedData);
      } else {
          callback([]);
      }
    });
}
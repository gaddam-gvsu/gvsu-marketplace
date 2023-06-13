import { getDatabase, onValue, push, ref } from "firebase/database";

import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyCptHyVUlKcUeG_z2fW-lcuCiL8uhRosiQ",
    authDomain: "cis-657-daeac.firebaseapp.com",
    projectId: "cis-657-daeac",
    storageBucket: "cis-657-daeac.appspot.com",
    messagingSenderId: "626456826352",
    appId: "1:626456826352:web:9c65460b0304fb3f7a4d35",
    measurementId: "G-5JTDGMMGH8"
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
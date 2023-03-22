import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const config = {
    apiKey: "AIzaSyBzsTdkWmVEmWb4b_2tNVWS5Ytj5o05Vm0",
    authDomain: "fuel-7e52b.firebaseapp.com",
    databaseURL: "https://fuel-7e52b-default-rtdb.firebaseio.com",
    projectId: "fuel-7e52b",
    storageBucket: "fuel-7e52b.appspot.com",
    messagingSenderId: "326590794003",
    appId: "1:326590794003:web:e5fae547bbb879113fb2e6",
    measurementId: "G-25FTLHZVJM",
    functionsUrl: 'https://us-central1-fuel-7e52b.cloudfunctions.net/app'
  };

  console.log("iitialized firebase!")

export const app = initializeApp(config);
export const auth = getAuth(app);
export const db = getFirestore(app);


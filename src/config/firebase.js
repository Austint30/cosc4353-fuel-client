import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBzsTdkWmVEmWb4b_2tNVWS5Ytj5o05Vm0",
    authDomain: "fuel-7e52b.firebaseapp.com",
    databaseURL: "https://fuel-7e52b-default-rtdb.firebaseio.com",
    projectId: "fuel-7e52b",
    storageBucket: "fuel-7e52b.appspot.com",
    messagingSenderId: "326590794003",
    appId: "1:326590794003:web:e5fae547bbb879113fb2e6",
    measurementId: "G-25FTLHZVJM"
  };

  console.log("iitialized firebase!")

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);


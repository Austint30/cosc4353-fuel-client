import logo from './logo.svg';

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgToZZsOfj152nmGH8IzhkXup82Ib9BEs",
  authDomain: "fuelquote-a1262.firebaseapp.com",
  projectId: "fuelquote-a1262",
  storageBucket: "fuelquote-a1262.appspot.com",
  messagingSenderId: "721477043991",
  appId: "1:721477043991:web:9744543b456f536dde1952",
  measurementId: "G-9ER20ZPVM9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const profile_form_element = document.getElementById("update");
const in_state = document.getElementById("in_state");
const state = document.getElementById("state");

async function EditProfile (event) {
  event.preventDefault();
  try {
      const docRef = await addDoc(collection(db, "user_profile"), {
          first: "Ada",
          last: "Lovelace",
          born: 1815
      });
      console.log("Document written with ID: ", docRef.id);
      } catch (e) {
      console.error("Error adding document: ", e);
      }
}

async function SignUp (event) {
  event.preventDefault();
  
  try {
      const auth = await getAuth();
      const user_credential = await createUserWithEmailAndPassword(auth, email_element.value, password_element.value);
      const user = user_credential.user;
      console.log(user);
      const docRef = await addDoc(collection(db, "user_profile"), {uid: user.uid});

      console.log("Document written with ID: ", docRef.id);
  } catch(error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error);
  }
}

function App() {
  return (
    <div>
      <div>
          <p>Enter login information:</p>
          <form id = "login" onSubmit={SignUp}>
              <label>email</label>
              <input type = "text" name = "email" id = "email"></input>
              <label>password</label>
              <input type = "password" name = "password" id = "password"></input>
              <button type = "submit">login</button>
          </form>
      </div>
      <div>
          <p>Update profile:</p>
          <form id = "update" onSubmit={EditProfile}>
              <label>In state</label>
              <input type = "checkbox" name = "in_state" id = "in_state"></input>
              <label>State</label>
              <input type = "text" name = "state" id = "state"></input>
              <button type = "submit">update</button>
          </form>
      </div>
    </div>
  );
}

export default App;

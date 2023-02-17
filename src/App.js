import React, { useEffect, useState } from 'react';

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
import { HashRouter, Route, Routes } from 'react-router-dom';
import GlobalNavbar from './components/global-navbar';
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import 'bootstrap/dist/css/bootstrap.min.css';
import config from 'config';
import EditProfile from './pages/edit_profile';
import {app, db, auth} from './config/firebase.js';
import PageContent from 'components/page-content';
import LoggedIn from './pages/logged_in'
import {ProfileProvider} from './context'
import { getAuth } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";


// curly braces when there is an extant export default

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyDgToZZsOfj152nmGH8IzhkXup82Ib9BEs",
//     authDomain: "fuelquote-a1262.firebaseapp.com",
//     projectId: "fuelquote-a1262",
//     storageBucket: "fuelquote-a1262.appspot.com",
//     messagingSenderId: "721477043991",
//     appId: "1:721477043991:web:9744543b456f536dde1952",
//     measurementId: "G-9ER20ZPVM9"
//   };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

function App() {

    const [ data, setData ] = useState(null);
    const [ profile, setProfile ] = useState(null);
    console.log(profile);

    useEffect(() => {
        console.log(auth);
        const testAuth = getAuth();
        console.log("testAuth: ", testAuth);
        // if (auth && auth.currentUser)
        if (testAuth)
        {
            setProfile({
                auth: true
            });
        }
    }, [])

    return (
       <ProfileProvider value = {{profile, setProfile}}>
         <HashRouter>
            <GlobalNavbar />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/logged_in" element={<LoggedIn />} />
                <Route path="/edit_profile" element={<EditProfile />} />
            </Routes>
        </HashRouter>
       </ProfileProvider>
    );
}

export default App;
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
import PageContent from 'components/page-content';

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

function App() {

    const [ data, setData ] = useState(null);

    useEffect(() => {
        // Call backend test url
        fetch(config.serverUrl + '/test')
        .then((resp) => resp.json())
        .then((data) => setData(data))
    })

    return (
        <HashRouter>
            <GlobalNavbar />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
            <PageContent title='Server test'>
                {data ? JSON.stringify(data) : 'Loading...'}
            </PageContent>
        </HashRouter>
    );
}

export default App;
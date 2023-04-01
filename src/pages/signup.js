import React, {useRef} from 'react';
import PageContent from '../components/page-content';
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from '../config/firebase.js'


function Signup() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null); // initialize as null
    async function handleSubmit(event) {
        
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        // see if email is valid email string
        try {
            if (!/\w+[@]\w+[\.]\w+/.test(email))
            {
                
                throw new Error("Invalid Email!");
            }
            console.log("email ", email);
            console.log("password: ", password);

            
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            console.log(userCredential);
            const loc = window.location.href.split('#')[0];
            window.location = loc + '#/profile';
            console.log("logging loc : ", loc);
            // window.location = "/profile#/profile";
            

        } catch (error) {

            alert("email was not valid! ", error.message);
        }

        // libraries zod and joi <- validation libraries
        // throw exception if email string does not end in
    }
    return (
        <PageContent title='Sign up!'>
            <form className = "form" onSubmit = {handleSubmit}>
                <div>
                    <label className = "label">Enter your email: </label>
                    <input type = "text" ref = {emailRef}/>
                </div>
                <div>
                    <label className = "label">Enter your password: </label>
                    <input type = "password" ref = {passwordRef}/>
                </div>
                <div className = "submitButton">
                    <button type = "submit">Signup</button>
                </div>
            </form>
        </PageContent>
    );
}

export default Signup;
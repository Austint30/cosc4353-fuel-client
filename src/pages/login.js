import React, {useRef, useState, useContext} from 'react';
import PageContent from '../components/page-content';
import { signInWithEmailAndPassword  } from "firebase/auth";
import {auth} from '../config/firebase.js'
import {useNavigate} from 'react-router-dom'
import { Link } from 'react-router-dom';
import { ProfileContext} from '../context';


function Login() {

    const {profile, setProfile} = useContext(ProfileContext);

    const navigate = useNavigate();

    const emailRef = useRef(null);
    const passwordRef = useRef(null); // initialize as null
    const [errors, setErrors] = useState({}); // returns array of 2 components
                                              // index 0 = (errors) what we read from in the state
                                              // index 1 = (setErrors) update function
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
            const userCredential = await signInWithEmailAndPassword(auth, email, password)

            localStorage.setItem("idToken", userCredential._tokenResponse.idToken);
            localStorage.setItem("refreshToken", userCredential._tokenResponse.refreshToken);
            localStorage.setItem("user", JSON.stringify(userCredential.user))
            
            console.log("******************************************");
            const uid = userCredential.user.uid;
            console.log(userCredential.user.uid);
            console.log("******************************************");
            setProfile({
                auth: true
            });
            navigate('/logged_in');
            return uid;
        } catch (error) {
            console.log(error.message);
            setErrors({
                ...errors,
                email: "Either that email or that password was not associated with an account."
            });
            // alert("email was not valid! ", error.message);
        }

        // libraries zod and joi <- validation libraries
        // throw exception if email string does not end in
    }
    return (
        <PageContent title='Log In'>
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
                    <button type = "submit">Login</button>
                </div>
            </form>
            <div>
                {   
                    errors.email && 
                    <div className = "signupError">
                        
                        <p>
                            {errors.email}
                        </p>
                        <Link to = "/signup">Try Signing Up</Link>
                    </div>
                }
            </div>
        </PageContent>
    );
}

export default Login;
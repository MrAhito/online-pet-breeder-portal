import React, { useRef, useState } from 'react'
import * as aiIcons from 'react-icons/cg'
import { Link, useHistory } from "react-router-dom";
import './Login.css'
import { auth } from '../firebase/firebase';
import RegUserForm from './RegUserForm';

function Login() {
    const emailRef = useRef();
    const passRef = useRef();
    const history = useHistory();

    const [validate, setValid] = useState();
    const [showReg, setshowReg] = useState(false);
    const sh = () => {
         setshowReg(!showReg);
        }
    const login = e => {
        e.preventDefault();
        const email =  emailRef.current.value;
        const password =  emailRef.current.value;

        if(email === "admin" && password === "admin"){
            history.push('/admin');
        }else{

        auth.signInWithEmailAndPassword(
            emailRef.current.value, passRef.current.value
        ).then(user => {
            history.push('/dashboard');
            console.log(user)
        }).catch(err => {
            if (err.code === 'auth/network-request-failed') {
                setValid("Establishing Internet Connection Failed");
            } else if (err.code === 'auth/invalid-email') {
                setValid("No Account Found");
            } else if (err.code === 'auth/wrong-password') {
                setValid("Incorrect Password");
            } else {

            }
        });
        }
    }
    return (
        <>
            <div id='home' className="log-container">
                <div className="log-title"><h1>Pet Breeding Portal</h1><p>Your Pet Breeding Companion</p><a href='/training-page'>{"<=== TO Training Page"}</a></div>
                <div className="f-container">
                    <form className="form-container">
                        <input type="text" name="email" ref={emailRef} id="txt-email" placeholder="Email Address" className="txt txemail" required />
                        <input type="password" name="pword" ref={passRef} id="txt-pass" placeholder="Password" className="txt txpass" required />
                        <a href='#home' className='fic'><span className='validate'>{validate}</span></a>
                        <button className="btn btn-submit " id="btn-sub" onClick={login}>Log In</button>
                        <a href='#home' className='fic'>Forgot Password?</a>
                        <div className='bordertop' />
                        <Link to='' onClick={sh}>
                            <button className="btn btn-reg">Create New Account</button>
                        </Link>
                    </form>
                </div>
            </div>

            <div className={showReg ? 'reg-container show' : 'reg-container'}>
                <div className="reg-header-continer">
                    <div className="reg-heder">
                        <Link to='' className='exitBtn' type='reset' onClick={sh}>
                            <aiIcons.CgClose />
                        </Link>
                        <h1 className='tittle-reeg'>Register</h1>
                    </div>
                <RegUserForm />
                </div>
            </div>
        </>
    )
}

export default Login

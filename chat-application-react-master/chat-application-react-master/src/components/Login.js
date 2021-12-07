import React from 'react';
import {GoogleOutlined} from '@ant-design/icons';
import "firebase/app";
import {auth} from '../firebase'
import firebase from 'firebase/app';

//Login page with button to login
const login = function(){
    return(
        <div id="login-page">
            <div id="login-card">
                <h2>Welkom Besto Frendo!</h2>

                <div className="login-button google" onClick={function() //Connection to firebase so you can only log in with your Google Account.
                    {auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}
                    }> 
                    <GoogleOutlined/> Login met Google 
                </div>
            </div>
        </div>
    );
}

export default login
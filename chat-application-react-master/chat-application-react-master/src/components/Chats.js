import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import {ChatEngine} from 'react-chat-engine';
import {auth} from '../firebase';

import { useAuthentication } from '../contexts/Authentication';
import axios from 'axios';

const Chats = function(){
    const history = useHistory();
    const {user} = useAuthentication();
    const [loading, setLoading] = useState(true);

    console.log(user);

    //Function lo logout from chat application
    const logoutButton = async function(){
        await auth.signOut();
        history.push('/');
    } 
    
    //Function to handle profile picture
    const picture = async function(url){
        const response = await fetch(url);
        const pictureData = await response.blob();

        return new File([pictureData], "userPhoto.jpg", {type: 'image/jpeg'});
    }

    //function that pushes the user to login page if not logged in.
    useEffect(function(){
        if(!user){
            history.push('/');
            return;
        }
        
        //get call for the users data
        axios.get('https://api.chatengine.io/users/me', {
            headers: {
                "project-id" : "ee1d4011-60e1-40ea-a98d-2768473b7a56",
                "user-name" : user.email,
                "user-secret" : user.uid,
            }
        })// setLoading set to false so that the chat can load
        .then(function(){
            setLoading(false)
        })// create chatengine profile for new users logging in
        .catch(function(){
            let data = new FormData();
            data.append('email', user.email);
            data.append('username', user.email);
            data.append('secret', user.uid);

            picture(user.photoURL).then(function(avatar){
                data.append('avatar', avatar, avatar.name)

                //post request to create user in chatengine.io
                axios.post('https://api.chatengine.io/users/', data, {headers: {"private-key" : "c1b2a20a-507e-4f49-bf38-262ee1210928"}}).then(function(){
                    setLoading(false);
                }).catch(function(error){
                    console.log(error)
                });
            })
        })
    }, [user, history]);

    if(!user || loading) return 'loading...'
    
    return (
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    BESTO FRENDO
                </div>
                <div onClick={logoutButton}className="logout-tab">
                    Logout
                </div>
            </div>
            
            <ChatEngine //Chatengine component to connect with Chatengine.io
                height="calc(100vh - 66px)"
                projectID="ee1d4011-60e1-40ea-a98d-2768473b7a56"
                userName={user.email}
                userSecret={user.uid}
            />
        </div>
    );
}

export default Chats;
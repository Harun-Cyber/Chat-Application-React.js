import React, {useContext, useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {auth} from '../firebase';

const ContextAuthentication = React.createContext();

//function that exports the populated ContextAuthentication so we can have acces to it
const useAuthentication = () => useContext(ContextAuthentication);

//function that manages the users data
const ProviderAuthentication = function({children}){
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const history = useHistory();

    //get user from Firebase Authentication
    useEffect(function(){
        auth.onAuthStateChanged(function(user){
            setUser(user);
            setLoading(false);
            if(user) history.push('/chats'); //if user logged in, redirect to chats page
        })
    }, [user, history]);

    const value = {user};

    //function for if it isn't loading the page, then show children
    return(
        <ContextAuthentication.Provider value = {value}>
            {!loading && children} 
        </ContextAuthentication.Provider>
    )
}

export {useAuthentication, ProviderAuthentication}
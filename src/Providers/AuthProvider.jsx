import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import {auth} from '../firebase/firebase.config'
import UseAxiosPublic from '../Hooks/UseAxiosPublic';



 export const AuthContext = createContext(null);

const  AuthProvider = ({children}) => {
    const [user,setUser]=useState(null);
    const [loading,setLoading] = useState(true)
    const axiosPublic = UseAxiosPublic();


    const googleProvider = new GoogleAuthProvider()


    const createUser = (email, password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
       
    }

    const login = (email, password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    const googleSignIn = () =>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const logOut = () =>{
        setLoading(true);
        return signOut(auth)
    }

    const updateUserProfile = (name, photo) =>{
        setLoading(true);
      return updateProfile(auth.currentUser,{
            displayName: name, photoURL: photo

        })

    }





 useEffect(()=>{
  const unsubscribe = onAuthStateChanged(auth, currentUser=>{
        setUser(currentUser);
      if(currentUser){
        // assign get token and store client
        const userInfo = {email: currentUser.email}

        axiosPublic.post('/jwt', userInfo)
        .then(res =>{
            if(res.data.token){
                localStorage.setItem('access-token', res.data.token)
                setLoading(false);
            }
        })
        

      }
      else{
        // remove token (if token stored in the client site)
        localStorage.removeItem('access-token');
        setLoading(false);
     

      }
    
        
    })
    return () =>{
        unsubscribe();
    }

    },[axiosPublic])


    const authInfo = {
        user,
        loading,
        createUser,
        login,
        logOut,
        updateUserProfile,
        googleSignIn 

    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
  
};

export default AuthProvider;
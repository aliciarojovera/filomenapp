import React, { useContext, useEffect, useState } from "react";
import {fireAuth} from "../firebase";
import {db} from '../firebase'
import { AppContext } from "./AppContext";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({user: {
            email: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user'))[0] : null,
            displayName: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user'))[1] : null,
            photoURL: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user'))[2] : null
        }, isUser: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user'))[3] : null,
    });

    const app = useContext(AppContext)

    useEffect(() => {
        fireAuth.onAuthStateChanged((user) => {
            if (user) {
                db.collection('users').doc(user.uid).collection('userData').doc('userData').get().then((doc) => {
                    if (doc.exists) {
                        if (doc.data().displayName) {
                            user = {...user, displayName: doc.data().displayName}
                        }
                        if (doc.data().photoURL) {
                            user = {...user, photoURL: doc.data().photoURL}
                        }
                    } else {
                        let userPic = user.photoURL
                        userPic = userPic.split("=", 1) + "=s250"
                        user = {...user, photoURL: userPic}
                    }
                    setAuth({user: user, isUser: true})
                    localStorage.setItem('user', JSON.stringify([user.email, user.displayName, user.photoURL , true]))
                })

                db.collection('users').doc(user.uid).collection('userInvData').doc('userInvData').get().then((doc) => {
                    if (doc.exists) {
                        app.setApp({...app.app, firstTime:false, myData: doc.data()})
                    } else {
                        app.setApp({...app.app, firstTime:true})
                    }
                })

            } else {
                setAuth({user: null, isUser: false})
                localStorage.setItem('user', JSON.stringify(false))
            }

        });
// eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
    <AuthContext.Provider value={{auth}}>
        {children}
    </AuthContext.Provider>
  );
};
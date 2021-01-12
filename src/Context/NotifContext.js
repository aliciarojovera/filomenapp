import React, { useState } from "react";
import './NotifContext.css'

export const NotifContext = React.createContext();

export const NotifProvider = ({ children }) => {

    const [Notif, setNotif] = useState({start:false});
    
    const run = props => {
        const type = props.type
        const msg = props.msg
        setNotif({type, msg, start:true})
        setTimeout(() => {
            setNotif({type, msg, start:false})
        }, 2000)
    }

    return (
    <NotifContext.Provider value={{run}}>
        <div id="NotifMainDiv" className={`NotifMainDiv ${Notif.start ? "open" : ""}`}>
        <div className={`NotifMsg ${Notif.type}`}>{Notif.msg}</div>
        </div>
        {children}
    </NotifContext.Provider>
  );
};
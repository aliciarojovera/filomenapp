import React, { useState } from "react";

export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {

    let startDate = new Date();
    let dd = String(startDate.getDate()).padStart(2, '0');
    let mm = String(startDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = startDate.getFullYear();
    startDate = dd + '/' + mm + '/' + yyyy;



    let endDate = new Date();
    endDate.setDate(endDate.getDate() + 30);
    let dd2 = String(endDate.getDate()).padStart(2, '0');
    let mm2 = String(endDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy2 = endDate.getFullYear();
    endDate = dd2 + '/' + mm2 + '/' + yyyy2;

    const [app, setApp] = useState({
        myData: {userName: "", userNIF:"", userAddress:"", userPostalCode:"", userCity:"", userState:"", userCountry:"", userMsg:"", userIVAType:"", userIRPFType:""},
        myClient: {clientName: "", clientNIF:"", clientAddress:"", clientPostalCode:"", clientCity:"", clientState:"", clientCountry:""},
        invData: {totalPrice: 0, ivaPrice: 0, irpfPrice: 0, totalTotal: 0, invStart: startDate, invEnd: endDate, invNum: ""},
        concept: {conNum: 1, conArray: [{conLabel: "Concepto 1", conName: "", conValue: "" }]}
    });

    return (
    <AppContext.Provider value={{app, setApp}}>
        {children}
    </AppContext.Provider>
  );
};
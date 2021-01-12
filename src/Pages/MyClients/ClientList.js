import './ClientList.css'
import ClientCard from './ClientCard'
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { db } from '../../firebase';
import Loader from '../../Shared/Loader/Loader';

const ClientList = () => {

    const [clientList, setClientList] = useState({theList: null})
    const authCtx = useContext(AuthContext)

    useEffect(() => {
        let myClients = []
        db.collection('users').doc(authCtx.auth.user.uid).collection('userClients').onSnapshot((snap) => {
            snap.docChanges().forEach((change) => {
                if (change.type === "added"){
                    let docData = change.doc.data()
                    let id = change.doc.id
                    myClients.push({docData, id})
                } if (change.type === "removed") {
                    myClients = myClients.filter(x => x.id !== change.doc.id)
                } if (change.type === "modified") {
                    myClients.forEach((client, idx) => {
                        if (client.id === change.doc.id){
                            client.docData = change.doc.data()
                        }
                    })
                }
            })
            setClientList({theList: myClients})
        })
    }, [authCtx])



    return ( 
        <>
        <h3 style={{textAlign:"center"}}>Mis Clientes</h3>
        {clientList.theList ?  clientList.theList.map((client, idx) => <ClientCard key={idx} idx={idx} {...client} />): <Loader/>}
        </>
    );
}
 
export default ClientList;
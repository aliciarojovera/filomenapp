import './ClientCard.css'
import {TextField, Button} from '@material-ui/core'
import { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { AppContext } from '../../Context/AppContext'
import { db } from '../../firebase'
import { Redirect } from 'react-router-dom'
import { NotifContext } from '../../Context/NotifContext'

const ClientCard = props => {

    const [divClass, setClass] = useState({open: false})
    const [values, setValues] = useState({clientName: "_"})
    const [redirect, setRedirect] = useState({ready: false})

    const authCtx = useContext(AuthContext)
    const app = useContext(AppContext)
    const Notif = useContext(NotifContext)

    const handleClick = () => {
        setClass({open: !divClass.open})
    }

    useEffect(() => {
        //Este useEffect es sólo para recargar las props y que los clientes se impriman bien
        setValues(props.docData)
    }, [props])

    const handleChange = e => {
        let value = e.target.value
        let name = e.target.name
        setValues({...values, [name]: value})
    }

    const handleDeleteBtn = id => {
        handleClick()
        db.collection('users').doc(authCtx.auth.user.uid).collection('userClients').doc(id).delete().then(() => {
            Notif.run({type:"success", msg:"Cliente eliminado"})
        }).catch((err) => Notif.run({type:"error", msg:err.messagge}))
    }

    const handleEditBtn = id => {
        db.collection('users').doc(authCtx.auth.user.uid).collection('userClients').doc(id).set(values).then(() => {
            Notif.run({type:"success", msg:"Cliente editado"})
        }).catch((err) => Notif.run({type:"error", msg:err.messagge}))
    }

    const handleNewInvBtn = id => {
        db.collection('users').doc(authCtx.auth.user.uid).collection('userClients').doc(id).get().then((doc) => {
            app.setApp({...app.app, myClient: doc.data()})
            setRedirect({ready: true})
        }).catch((err) => Notif.run({type:"error", msg:err.messagge}))
    }

    return ( 
        <>
        <div className="tab">
          <label className={divClass.open ? "tab-label open": "tab-label"} onClick={handleClick}>{values.clientName ? values.clientName : ""}</label>
          <div className={divClass.open ? "tab-content open": "tab-content"}>
                <div className="cardMainDiv">
                    <TextField fullWidth={true} name="clientName" label="Nombre" type="text" value={values.clientName ? values.clientName : ""} onChange={handleChange}/>
                    <TextField fullWidth={true} name="clientNIF" label="NIF/CIF" type="text" value={values.clientNIF ? values.clientNIF : ""} onChange={handleChange}/>
                    <TextField fullWidth={true} name="clientAddress" label="Dirección" type="text" value={values.clientAddress ? values.clientAddress : ""} onChange={handleChange}/>
                    <TextField fullWidth={true} name="clientPostalCode" label="Código Postal" type="text" value={values.clientPostalCode ? values.clientPostalCode : ""} onChange={handleChange}/>
                    <TextField fullWidth={true} name="clientCity" label="Ciudad" type="text" value={values.clientCity ? values.clientCity : ""} onChange={handleChange}/>
                    <TextField fullWidth={true} name="clientState" label="Provincia" type="text" value={values.clientState ? values.clientState : ""} onChange={handleChange}/>
                    <TextField fullWidth={true} name="clientCountry" label="País" type="text" value={values.clientCountry ? values.clientCountry : ""} onChange={handleChange}/>
                    <div className="clientBtn">
                        <Button className="editBtn" onClick={() => handleEditBtn(props.id)}>Guardar Cambios</Button>
                        <br></br>
                        <Button className="invoiceBtn" onClick={() => handleNewInvBtn(props.id)}>Hacer Factura</Button>
                        <hr></hr>
                        <Button className="deleteBtn" onClick={() => handleDeleteBtn(props.id)}>Eliminar Cliente</Button>
                    </div>
                </div>
          </div>
        </div>
        {redirect.ready ? <Redirect to="/newinvoice"/> : null }
        </>
    );
}
 
export default ClientCard;

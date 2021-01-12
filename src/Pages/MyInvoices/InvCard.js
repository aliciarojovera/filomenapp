import './InvCard.css'
import {Button} from '@material-ui/core'
import { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { AppContext } from '../../Context/AppContext'
import { db } from '../../firebase'
import { Redirect } from 'react-router-dom'
import { ThemeContext } from '../../Context/ThemeContext'
import { NotifContext } from '../../Context/NotifContext'

const InvCard = props => {

    const [divClass, setClass] = useState({open: false})
    const [values, setValues] = useState(props.docData)
    const [redirect, setRedirect] = useState({readyRender: false, readyEdit: false})

    const authCtx = useContext(AuthContext)
    const app = useContext(AppContext)
    const Theme = useContext(ThemeContext)
    const Notif = useContext(NotifContext)

    const handleClick = () => {
        setClass({open: !divClass.open})
    }

    useEffect(() => {
        //Este useEffect es sólo para recargar las props y que los clientes se impriman bien
        setValues(props.docData)
    }, [props])

    const handleDeleteBtn = id => {
        handleClick()
        db.collection('users').doc(authCtx.auth.user.uid).collection('userInvoices').doc(id).delete().then(() => {
            Notif.run({type:"success", msg:"Factura eliminada"})
        })
    }

    const handleEditBtn = id => {
        app.setApp(values)
        setRedirect({readyEdit: true})
    }

    const handleNewInvBtn = id => {
        app.setApp(values)
        setRedirect({readyRender: true})
    }

    return ( 
        <>
        <div className="tab">
          <label className={divClass.open ? "tab-label open": "tab-label"} onClick={handleClick}>{values.invData.invNum}, {values.myClient.clientName}</label>
          <div className={divClass.open ? "tab-content open": "tab-content"}>
                <div className={`cardMainDiv ${Theme.Theme.isDark && "Dark"}`}>
                    <table>
                        <tbody>
                        <tr>
                            <th>Número de factura: </th>
                            <td>{values.invData.invNum}</td>
                        </tr>
                        <tr>
                            <th>Fecha de emisión:</th>
                            <td>{values.invData.invStart}</td>
                        </tr>
                        <tr>
                            <th>Fecha de vencimiento: </th>
                            <td>{values.invData.invEnd}</td>
                        </tr>
                        <tr>
                            <th><hr></hr></th>
                            <td><hr></hr></td>
                        </tr>
                        <tr>
                            <th>Nombre:</th>
                            <td>{values.myClient.clientName}</td>
                        </tr>
                        <tr>
                            <th>NIF/CIF:</th>
                            <td>{values.myClient.clientNIF}</td>
                        </tr>
                        <tr>
                            <th>Dirección:</th>
                            <td>{values.myClient.clientAddress}</td>
                        </tr>
                        <tr>
                            <th>Código Postal:</th>
                            <td>{values.myClient.clientPostalCode}</td>
                        </tr>
                        <tr>
                            <th>Ciudad:</th>
                            <td>{values.myClient.clientCity}</td>
                        </tr>
                        <tr>
                            <th>Provincia:</th>
                            <td>{values.myClient.clientState}</td>
                        </tr>
                        <tr>
                            <th>País:</th>
                            <td>{values.myClient.clientCountry}</td>
                        </tr>
                        <tr>
                            <th><hr></hr></th>
                            <td><hr></hr></td>
                        </tr>

                        {values.concept.conArray.map((elm,idx) => (
                            <tr key={idx}>
                                <th>{elm.conName}</th>
                                <td>{elm.conValue} €</td>
                            </tr>
                        ))}
                        <tr>
                            <th><hr></hr></th>
                            <td><hr></hr></td>
                        </tr>

                        <tr>
                            <th>Total (Sin impuestos):</th>
                            <td>{values.invData.totalPrice} €</td>
                        </tr>
                        <tr>
                            <th>% IVA:</th>
                            <td>{values.invData.ivaPrice} €</td>
                        </tr>
                        <tr>
                            <th>% IRPF:</th>
                            <td>{values.invData.irpfPrice} €</td>
                        </tr>
                        <tr>
                            <th>TOTAL:</th>
                            <td>{values.invData.totalTotal} €</td>
                        </tr>
                        </tbody>
                    </table>
                    <div className="InvBtn">
                        <Button className="editBtn" onClick={() => handleEditBtn(props.id)}>EDITAR FACTURA</Button>
                        <br></br>
                        <Button className="invoiceBtn" onClick={() => handleNewInvBtn(props.id)}>DESCARGAR</Button>
                        <hr></hr>
                        <Button className="deleteBtn" onClick={() => handleDeleteBtn(props.id)}>Eliminar Factura</Button>
                    </div>
                </div>
          </div>
        </div>
        {redirect.readyRender ? <Redirect to="/renderinvoice"/> : null }
        {redirect.readyEdit ? <Redirect to="/newinvoice"/> : null }
        </>
    );
}
 
export default InvCard;
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../Context/AppContext'
import './RenderInvoice.css'
import React from 'react'
import html2canvas from 'html2canvas'
import { jsPDF } from "jspdf";
import Button from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/Save'
import EditIcon from '@material-ui/icons/Edit';
import { NotifContext } from '../../Context/NotifContext'
import { Redirect } from 'react-router-dom'

const RenderInvoice = () => {

    const app = useContext(AppContext)
    const Notif = useContext(NotifContext)
    const [img, setImg] = useState({imgReady: null})
    const [link, setLink] = useState({edit: false})

    useEffect(() => {
        html2canvas(document.getElementById("invMainDiv"), {
            scale: 1,
            width: 855,
            height: 1209
          }).then(canvas => {
            const imgData = canvas.toDataURL('image/jpeg');
            document.getElementById('renderImg').src = imgData
            setImg({imgReady: true, imgData:imgData})
        });
    }, [])

    const handleSaveInv = () => {
        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "pt",
            format: [630, 891]
          });
        pdf.addImage(img.imgData, 'JPEG', 0, 0);
        let invName = app.app.invData.invNum ? app.app.invData.invNum.toString() + ".pdf" : "factura.pdf"
        pdf.save(invName)
        Notif.run({type:"success", msg:"Descarga Finalizada"})
    }

    const handleEditInv = () => {
        setLink({edit: true})
    }

    return(
        <>
            <div className="renderImgDiv">
                <img id="renderImg" src="" alt="invoice"></img>
            </div>
            <br></br><br></br>
            {/* DIV PRINCIPAL */}     
            <div className="invMainDiv" id="invMainDiv" style={img.imgReady ? {display:"none"} : {display:"block"} } >
                {/* MIS DATOS */}
                <div className="myDataDiv">
                    <div className="myDataField">{app.app.myData.userName && app.app.myData.userName}</div>
                    <div className="myDataField">NIF: {app.app.myData.userNIF && app.app.myData.userNIF}</div>
                    <div className="myDataField">{app.app.myData.userAddress && app.app.myData.userAddress}</div>
                    <div className="myDataField">{app.app.myData.userPostalCode && app.app.myData.userPostalCode}, {app.app.myData.userCity && app.app.myData.userCity}</div>
                    <div className="myDataField">{app.app.myData.userState && app.app.myData.userState}</div>
                    <div className="myDataField">{app.app.myData.userCountry && app.app.myData.userCountry}</div>
                </div>
                {/* FECHA */}
                <div className="invDateDiv">
                    <div className="invDateField">Fecha de emisión: {app.app.invData.invStart && app.app.invData.invStart}</div>
                    <div className="invDateField">Fecha de vencimiento: {app.app.invData.invEnd && app.app.invData.invEnd}</div>
                </div>
                {/* FACTURA */}
                <div className="invTitleDiv">
                    <div className="invTitleField">FACTURA</div>
                </div>
                {/* NÚMERO DE FACTURA */}
                <div className="invNumDiv">
                    <div className="invNumField">Número de factura: {app.app.invData.invNum && app.app.invData.invNum}</div>
                </div>
                {/* DATOS DEL CLIENTE */}
                <div className="clientDataDiv">
                    <div className="clientDataField">{app.app.myClient.clientName && app.app.myClient.clientName}</div>
                    <div className="clientDataField">NIF: {app.app.myClient.clientNIF && app.app.myClient.clientNIF}</div>
                    <div className="clientDataField">{app.app.myClient.clientAddress && app.app.myClient.clientAddress}</div>
                    <div className="clientDataField">{app.app.myClient.clientPostalCode && app.app.myClient.clientPostalCode}, {app.app.myData.clientCity && app.app.myData.clientCity}</div>
                    <div className="clientDataField">{app.app.myClient.clientState && app.app.myClient.clientState}</div>
                    <div className="clientDataField">{app.app.myClient.clientCountry && app.app.myClient.clientCountry}</div>
                </div>
                {/* CONCEPTOS */}
                <table className="conceptMainTable">
                    <tbody>
                    <tr className="conceptTitles">
                        <th>Concepto</th>
                        <th>Base UD.</th>
                    </tr>
                    {/* MAPEAR APP.APP.CONCEPT.CONARRAY PARA PINTAR CONCEPTOS */}
                    {app.app.concept.conArray.map((elm, idx) => (
                    <tr className="conceptArray" key={idx}>
                        <td>{elm.conName}</td>
                        <td>{elm.conValue}</td>
                    </tr>
                    ))}
                    </tbody>
                </table>


                <table className="priceMainTable">
                <tbody>
                <tr className="subtotal">
                    <th>Subtotal:</th>
                    <td>{app.app.invData.totalPrice && app.app.invData.totalPrice} €</td>
                </tr>
                <tr className="ivaPrice">
                    <th>% IVA:</th>
                    <td>{app.app.invData.ivaPrice && app.app.invData.ivaPrice} €</td>
                </tr>
                <tr className="irpfPrice">
                    <th>% IRPF:</th>
                    <td>{app.app.invData.irpfPrice && app.app.invData.irpfPrice} €</td>
                </tr>
                <tr>
                    <th className="totalTotal" >TOTAL</th>
                    <td>{app.app.invData.totalTotal && app.app.invData.totalTotal} €</td>
                </tr>
                </tbody>
                </table>
                {/* MENSAJE */}
                <div className="invMsgDiv">
                    <div className="invMsgField">{app.app.myData.userMsg && app.app.myData.userMsg}</div>
                </div>
            </div>
            <div className="buttonsDiv">
                <Button 
                    className="saveBtn"
                    variant="contained"
                    color="secondary"
                    onClick={handleSaveInv}
                    startIcon={<SaveIcon />}

                    >
                    guardar factura
                </Button>
                    <br></br><br></br>
                <Button 
                    style={{
                        backgroundColor: "orange",
                        color:"white"
                    }}
                    className="editBtn"
                    onClick={handleEditInv}
                    startIcon={<EditIcon />}
                    >
                    Editar factura
                </Button>
                {link.edit ? <Redirect to="/newinvoice"/> : null}
            </div>
        </>
    )
}

export default RenderInvoice
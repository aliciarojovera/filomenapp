import { Button, NativeSelect, FormControl, FormHelperText } from '@material-ui/core'
import NewInvField from './NewInvField'
import {useState, useContext, useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import './NewInvoice.css'
import { AuthContext } from '../../Context/AuthContext';
import { db } from '../../firebase';
import NewInvNum from './NewInvNum'
import SaveIcon from '@material-ui/icons/Save'
import { AppContext } from '../../Context/AppContext';
import NewInvDate from './NewInvDate'

const NewInvoice = () => {

    const appCtx = useContext(AppContext)

    const [myData, setMyData] = useState({userName: appCtx.app.myData.userName, userNIF:appCtx.app.myData.userNIF, userAddress:appCtx.app.myData.userAddress, userPostalCode:appCtx.app.myData.userPostalCode, userCity:appCtx.app.myData.userCity, userState:appCtx.app.myData.userState, userCountry:appCtx.app.myData.userCountry, userMsg:appCtx.app.myData.userMsg, userIVAType:appCtx.app.myData.userIVAType, userIRPFType:appCtx.app.myData.userIRPFType})
    const [clientList, setClientList] = useState({theList: null})
    const [myClient, setMyClient] = useState({clientName: appCtx.app.myClient.clientName, clientNIF:appCtx.app.myClient.clientNIF, clientAddress:appCtx.app.myClient.clientAddress, clientPostalCode:appCtx.app.myClient.clientPostalCode, clientCity:appCtx.app.myClient.clientCity, clientState:appCtx.app.myClient.clientState, clientCountry:appCtx.app.myClient.clientCountry})
    const [invData, setInvData] = useState({invNum: appCtx.app.invData.invNum, invStart: appCtx.app.invData.invStart, invEnd: appCtx.app.invData.invEnd, totalPrice: appCtx.app.invData.totalPrice, ivaPrice: appCtx.app.invData.ivaPrice, irpfPrice: appCtx.app.invData.irpfPrice, totalTotal: appCtx.app.invData.totalTotal})
    const authCtx = useContext(AuthContext)
    const [concept, setConcept] = useState(appCtx.app.concept)

    const[invRender, setInvRender] = useState({invData: null, userReady: false})

    const handleInvCreate = () => {
        //Si hay requeridos que no están puesto alerta, si no, abajo:
        if (!myData.userName) {
            alert('El campo de tu nombre está vacío y es requerido')
        } else if (!myClient.clientName) {
            alert('El nombre del cliente está vacío y es requerido')
        } else if (!invData.invNum) {
            alert('El número de factura es requerido, puedes generarlo automáticamente')
        } else {
            db.collection('users').doc(authCtx.auth.user.uid).collection('userInvoices').doc().set({
                myData: myData, myClient: myClient, invData: invData, concept: concept
            }).then((res) => {
                appCtx.setApp({myData: myData, myClient: myClient, invData: invData, concept: concept, userReady: true})
                window.scrollTo(0, 0)
                setInvRender({invData: "something"})
            })
        }
    }

    const getTotalPrice = () => {
        let totalPrice = 0
        let arrayCopy = [...concept.conArray]
        arrayCopy.forEach(elm => {
            totalPrice = +totalPrice + +elm.conValue
        })
        return totalPrice.toFixed(2)
    }

    const getIrpfPrice = (totalPrice) => {
        const irpfType = myData.userIRPFType
        const irpfPrice = (totalPrice*(irpfType/100))
        return irpfPrice.toFixed(2)
    }

    const getIvaPrice = (totalPrice) => {
        const ivaType = myData.userIVAType
        const ivaPrice = (totalPrice*(ivaType/100))
        return ivaPrice.toFixed(2)
    }

    const setAllInvData = () => {
        let totalPrice = getTotalPrice()
        let ivaPrice = getIvaPrice(totalPrice)
        let irpfPrice = getIrpfPrice(totalPrice)
        let totalTotal = (+totalPrice + +ivaPrice - +irpfPrice).toFixed(2)
        setInvData({...invData, totalPrice, ivaPrice, irpfPrice, totalTotal})
    }

    useEffect(() => {
        db.collection('users').doc(authCtx.auth.user.uid).collection('userInvData').doc('userInvData').get().then((doc) => {
            if (doc.exists) {
                const myData = doc.data()
                setMyData(myData)
            }
        })
    }, [authCtx])

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
                    let myClientMod = myClients.filter(x => x.id === change.doc.id)
                    let myClientsArr = myClients.filter(x => x.id !== change.doc.id)
                    let id = change.doc.id
                    myClientsArr.push({myClientMod, id})
                    myClients = myClientsArr
                }
            })
            setClientList({theList: myClients})
        })
    }, [authCtx])

    const addConcept = () => {
        setConcept({
            conNum: concept.conNum + 1,
            conArray:[
                ...concept.conArray,
                {
                    conLabel: "Concepto " + (concept.conNum + 1),
                    conName: "",
                    conValue: ""
                }
            ]
        })
    }

    const removeConcept = idx => {
        let conCopy = {...concept}
        conCopy.conArray = conCopy.conArray.filter((x, id) => id !== idx)
        conCopy.conNum = conCopy.conNum - 1
        setConcept(conCopy)
    }

    const handleInputChange = e => {
        let name = e.target.name
        let value = e.target.value
        console.log('nameValue no usados: ', name, value)
    }

    const handleMyData = e => {
        let name = e.target.name
        let value = e.target.value
        setMyData({...myData, [name]: value})
    }

    const handleClientData = e => {
        let name = e.target.name
        let value = e.target.value
        setMyData({...myClient, [name]: value})
    }


    const checkRegex = (name, value) => {

        const regex = /^[0-9]*[.]?[0-9]*$/

        if (name === "conValue"){
            if (!value.match(regex)) {
                return false
            } else {
                return true
            }
        } else {
            return true
        }
    }

    const handleInputConChange = e => {
        let id = e.target.name.split(',', 2)[1]
        let name = e.target.name.split(',', 2)[0]
        let value = e.target.value.split(',', 2)[0]
        if (checkRegex(name, value)) {
            let conCopy = {...concept}
            conCopy.conArray[id] = {...conCopy.conArray[id], [name]: value}
            setConcept(conCopy)
            if (name === "conValue") {
                setAllInvData()
            }
        } else {
            alert('Sólo se admiten cifras en número')
        }
    }
    

    const handleClientChange = e => {
        let choosenClient = e.target.value
        let listCopy = {...clientList}
        let choosenData = listCopy.theList.filter((elm => elm.id === choosenClient))[0]
        setMyClient(choosenData.docData)
    }

    const handleNewInvNumChange = e => {
        setInvData({...invData, invNum: e.target.value})
    }

    const handleNewInvNumGen = date => {
        setInvData({...invData, invNum: date})
    }

    const handleNewInvStartChange = e => {
        setInvData({...invData, invStart: e.target.value})
    }

    const handleNewInvEndChange = e => {
        setInvData({...invData, invEnd: e.target.value})
    }


    return (
        <>
            <h2 style={{textAlign:"center"}}>Nueva Factura</h2>
            <div className="myData">
                <h3 style={{textAlign:"center"}}>Mis datos</h3>
                <NewInvField name="userName" label="Nombre y apellidos" icon="AccountCircleIcon" value={myData.userName} onChange={handleMyData}/>
                <NewInvField name="userNIF" label="NIF / CIF" icon="FingerprintIcon" value={myData.userNIF} onChange={handleMyData}/>
                <NewInvField name="userAddress" label="Dirección" icon="HomeIcon" value={myData.userAddress} onChange={handleMyData}/>
                <NewInvField name="userPostalCode" label="Código Postal" icon="MarkunreadMailboxIcon" value={myData.userPostalCode} onChange={handleMyData}/>
                <NewInvField name="userCity" label="Ciudad" icon="LocationCityIcon" value={myData.userCity} onChange={handleMyData}/>
                <NewInvField name="userState" label="Provincia" icon="MapIcon" value={myData.userState} onChange={handleMyData}/>
                <NewInvField name="userCountry" label="País" icon="FlagIcon" value={myData.userCountry} onChange={handleMyData}/>
                <NewInvField name="userMsg" label="Mensaje de pago" icon="EditIcon" value={myData.userMsg} onChange={handleMyData}/>
                <NewInvField name="userIVAType" label="Tipo de IVA %" icon="PlaylistAddIcon" value={myData.userIVAType} onChange={handleMyData}/>
                <NewInvField name="userIRPFType" label="Tipo de IRPF %" icon="PlaylistAddIcon" value={myData.userIRPFType} onChange={handleMyData}/>
            </div>


            <div className="myData">
                <h3 style={{textAlign:"center"}}>Elige un Cliente</h3>
                <div className="chooseClientMainDiv">
                <FormControl className="chooseClientDiv">
                    <NativeSelect
                    fullWidth={true}
                    select="true" 
                    variant='filled'
                    onChange={handleClientChange}
                    defaultValue="null"
                    inputProps={{
                        name: 'userClientChoice',
                        id: 'userClientChoice',
                    }}
                    >
                        <option value="null" disabled>{myClient.clientName ? myClient.clientName : "Elige un cliente"}</option>
                        {clientList.theList ? clientList.theList.map((elm, idx) => (
                        <option key={idx} value={elm.id}>{elm.docData.clientName}</option>
                        ))
                        : null}
                    </NativeSelect>
                    <FormHelperText>Elige un cliente de de tu lista de clientes</FormHelperText>
                </FormControl>
                </div>
            </div> 



            <div className="myData">
                <NewInvField name="clientName" label="Nombre y apellidos" icon="AccountCircleIcon" value={myClient.clientName} onChange={handleClientData}/>
                <NewInvField name="clientNIF" label="NIF / CIF" icon="FingerprintIcon" value={myClient.clientNIF} onChange={handleClientData}/>
                <NewInvField name="clientAddress" label="Dirección" icon="HomeIcon" value={myClient.clientAddress} onChange={handleClientData}/>
                <NewInvField name="clientPostalCode" label="Código Postal" icon="MarkunreadMailboxIcon" value={myClient.clientPostalCode} onChange={handleClientData}/>
                <NewInvField name="clientCity" label="Ciudad" icon="LocationCityIcon" value={myClient.clientCity} onChange={handleClientData}/>
                <NewInvField name="clientState" label="Provincia" icon="MapIcon" value={myClient.clientState} onChange={handleClientData}/>
                <NewInvField name="clientCountry" label="País" icon="FlagIcon" value={myClient.clientCountry} onChange={handleClientData}/>
            </div>
            <div className="myData">
                <h3 style={{textAlign:"center"}}>Datos de la factura</h3>

                <NewInvNum onChange={handleNewInvNumChange} onGen={handleNewInvNumGen} value={invData.invNum}/>
                <br></br>
                <NewInvDate 
                onStartChange={handleNewInvStartChange}
                defaultStart={invData.invStart}
                onEndChange={handleNewInvEndChange}
                defaultEnd={invData.invEnd}
                />

                {concept.conArray.map((elm, idx) => (
                    <div className="conceptDiv" key={idx}>
                        <NewInvField name={'conName,' + idx} label={elm.conLabel} icon="EditIcon" onChange={handleInputConChange} value={elm.conName}/>
                        <NewInvField name={'conValue,' + idx} label="Cantidad" icon="EuroIcon" onChange={handleInputConChange} value={elm.conValue}/>
                        <br></br><br></br>
                        <Button style={{backgroundColor:"green", color:"white"}} onClick={addConcept}>Añadir Concepto</Button>
                        {idx + 1 === concept.conNum && idx > 0 ? <><Button style={{backgroundColor:"red", color:"white"}} onClick={() => removeConcept(idx)}>Eliminar</Button> </>: null}
                    </div>
                ))}

                <br></br><br></br>
                <NewInvField name="clientCity" label="SUBTOTAL (sin impuestos)" icon="EuroIcon" value={invData.totalPrice ? invData.totalPrice : null} onChange={handleInputChange}/>
                <NewInvField name="clientAddress" label="+ IVA" icon="PlaylistAddIcon" value={invData.ivaPrice ? invData.ivaPrice : null} onChange={handleInputChange}/>
                <NewInvField name="clientPostalCode" label="- IRPF" icon="PlaylistAddIcon" value={invData.irpfPrice ? invData.irpfPrice : null} onChange={handleInputChange}/>
                <NewInvField name="clientCity" label="TOTAL (con impuestos)" icon="EuroIcon" value={invData.totalTotal ? invData.totalTotal : null} onChange={handleInputChange}/>
            </div>
            <br></br><br></br>
            <div className="myData">
                <Button 
                    className="createInvBtn"
                    variant="contained"
                    color="secondary"
                    onClick={handleInvCreate}
                    fullWidth={true}
                    startIcon={<SaveIcon />}

                    >
                    Crear Factura
                </Button>
                {invRender.invData ? <Redirect to="/renderinvoice"/> : null}

          </div>
          <br></br><br></br>

        </>
    );
}
 
export default NewInvoice;
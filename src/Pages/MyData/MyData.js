import './MyData.css'
import { useContext, useEffect, useState } from 'react'
import {TextField, InputAdornment, Button, NativeSelect, FormControl, FormHelperText} from '@material-ui/core'
import EmailIcon from '@material-ui/icons/Email';
import HomeIcon from '@material-ui/icons/Home';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import MarkunreadMailboxIcon from '@material-ui/icons/MarkunreadMailbox';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import MapIcon from '@material-ui/icons/Map';
import FlagIcon from '@material-ui/icons/Flag';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import { AuthContext } from '../../Context/AuthContext';
import {db} from '../../firebase'
import Bridge from './Bridge'
import { ThemeContext } from '../../Context/ThemeContext';
import { NotifContext } from '../../Context/NotifContext'

const MyData = () => {

    const authCtx = useContext(AuthContext)

    const [userInvData, setState] = useState({
        userName: authCtx.auth.isUser ? authCtx.auth.user.displayName : "", userNIF: "", userMail: authCtx.auth.isUser ? authCtx.auth.user.email : "", userAddress: "", userPostalCode: "", userCity: "", userState: "", userCountry:"España", userMsg:"Pago mediante transferencia bancaria a número de cuenta: ESXX-XXXX-XXXX-XXXX", userIVAType: "21", userIRPFType: "7"
    })

    const Theme = useContext(ThemeContext)

    const Notif = useContext(NotifContext)

    useEffect(() => {
        db.collection('users').doc(authCtx.auth.user.uid).collection('userInvData').doc('userInvData').get().then((doc) => {
            if (doc.exists) {
                const myData = doc.data()
                setState(myData)
            }
        })
    }, [authCtx])

    const handleSubmit = () => {
        db.collection('users').doc(authCtx.auth.user.uid).collection('userInvData').doc('userInvData').set(userInvData).then((res) => {
            Notif.run({msg:"Cambios actualizados", type:"success"})
        })
    }

    const handleInputChange = e => {
        const name = e.target.name
        const value = e.target.value
        setState({...userInvData, [name]: value})
    }

    return (
        <>
        <div className={"mainDataForm"}>
            <h3 className="">Información Personal</h3>
            <p className="">(podrás cambiarla en cada factura)</p>
            <TextField
                className={Theme.Theme.isDark ? "Dark" : ""}
                value={userInvData.userName ? userInvData.userName : authCtx.auth.isUser ? authCtx.auth.user.displayName : ""}
                name="userName"
                size="small"
                fullWidth={true}
                label="Nombre y apellidos"
                placeholder=""
                onChange={handleInputChange}
                InputProps={{startAdornment: (<InputAdornment position="start"><AccountBoxIcon/></InputAdornment>),}}
                />
            <br/><br/>
            <TextField
                value={userInvData.userNIF ? userInvData.userNIF : ""}
                name="userNIF"
                size="small"
                fullWidth={true}
                label="NIF / CIF"
                placeholder=""
                onChange={handleInputChange}
                InputProps={{startAdornment: (<InputAdornment position="start"><FingerprintIcon/></InputAdornment>),}}
                />
            <br/><br/>
            <TextField
                value={userInvData.userMail ? userInvData.userMail : authCtx.auth.isUser ? authCtx.auth.user.email : ""}
                name="userMail"
                size="small"
                fullWidth={true}
                label="Email"
                placeholder=""
                onChange={handleInputChange}
                InputProps={{startAdornment: (<InputAdornment position="start"><EmailIcon/></InputAdornment>),}}
                />
            <br/><br/>
            <TextField
                value={userInvData.userAddress ? userInvData.userAddress : ""}
                name="userAddress"
                size="small"
                fullWidth={true}
                label="Dirección"
                placeholder=""
                onChange={handleInputChange}
                InputProps={{startAdornment: (<InputAdornment position="start"><HomeIcon/></InputAdornment>),}}
                />
            <br/><br/>
            <TextField
                value={userInvData.userPostalCode ? userInvData.userPostalCode : ""}
                name="userPostalCode"
                size="small"
                fullWidth={true}
                label="Código Postal"
                placeholder=""
                onChange={handleInputChange}
                InputProps={{startAdornment: (<InputAdornment position="start"><MarkunreadMailboxIcon/></InputAdornment>),}}
                />
            <br/><br/>
            <TextField 
                value={userInvData.userCity ? userInvData.userCity : ""}
                name="userCity"
                size="small"
                fullWidth={true}
                label="Ciudad"
                placeholder=""
                onChange={handleInputChange}
                InputProps={{startAdornment: (<InputAdornment position="start"><LocationCityIcon/></InputAdornment>),}}
                />
            <br/><br/>
            <TextField 
                value={userInvData.userState ? userInvData.userState : ""}
                name="userState"
                size="small"
                fullWidth={true}
                label="Provincia"
                placeholder=""
                onChange={handleInputChange}
                InputProps={{startAdornment: (<InputAdornment position="start"><MapIcon/></InputAdornment>),}}
                />
            <br/><br/>
            <TextField 
                value={userInvData.userCountry ? userInvData.userCountry : "España"}
                name="userCountry"
                size="small"
                fullWidth={true}
                label="País"
                placeholder=""
                onChange={handleInputChange}
                InputProps={{startAdornment: (<InputAdornment position="start"><FlagIcon/></InputAdornment>),}}
                />
            <br/><br/>

            <TextField 
                value={userInvData.userMsg ? userInvData.userMsg : "Pago mediante transferencia bancaría a número de cuenta: ESXX-XXXX-XXXX-XXXX"}
                name="userMsg"
                multiline
                size="small"
                fullWidth={true}
                label="Mensaje de pago"
                placeholder="Pago mediante transferencia bancaría a número de cuenta: ESXX-XXXX-XXXX-XXXX"
                onChange={handleInputChange}
                InputProps={{startAdornment: (<InputAdornment position="start"><EditIcon/></InputAdornment>),}}
                />
            <br/><br/>

                <h4 className="invoiceDetailTitle">Tipo de IVA</h4>
                <FormControl>
                    <NativeSelect
                    value={userInvData.userIVAType ? userInvData.userIVAType : 21}
                    select="true" 
                    variant='filled'
                    onChange={handleInputChange}
                    inputProps={{
                        name: 'userIVAType',
                        id: 'IVAType',
                    }}
                    >
                        <option value={21}>IVA: 21 %</option>
                        <option value={14}>IVA: 14 %</option>
                        <option value={7}>IVA: 7 %</option>
                    </NativeSelect>
                    <FormHelperText>Tipo de IVA de tus facturas, lo normal es el 21%</FormHelperText>
                </FormControl>

                  <br></br>

                  <h4 className="invoiceDetailTitle">Tipo de IRPF</h4>
                <FormControl>
                <NativeSelect
                value={userInvData.userIRPFType ? userInvData.userIRPFType : 7}
                className="formOption"
                select="true" 
                variant='filled'
                onChange={handleInputChange}
                inputProps={{
                    name: 'userIRPFType',
                    id: 'IRPFType',
                    style: { fontSize: 12 }
                  }}
                >
                    <option className="formOption" value={0}>0%: Sin retención</option>
                    <option className="formOption" value={1}>1%: Módulos o actividades ganaderas</option>
                    <option className="formOption" value={2}>2%: Actividades ganaderas</option>
                    <option className="formOption" value={7}>7%: Profesionales en los dos primeros años</option>
                    <option className="formOption" value={15}>15%: Profesionales</option>
                    <option className="formOption" value={19}>19%: Alquileres o intereses</option>
                </NativeSelect>
                <FormHelperText>Tipo de retención de IRPF</FormHelperText>
                </FormControl>

                



            <br/><br/>
            <Button 
                className="install-button"
                variant="contained"
                color="secondary"
                onClick={() => handleSubmit()}
                fullWidth={true}
                startIcon={<SaveIcon />}
            >
            Actualizar Información
            </Button>

            <Bridge/>

        </div>
        </>
    );
}
 
export default MyData;
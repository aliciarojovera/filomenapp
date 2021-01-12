import { useState, useContext } from 'react';
import './NewAlert.css'
import { Button, NativeSelect, FormControl, FormHelperText } from '@material-ui/core'
import {TextField, InputAdornment} from '@material-ui/core'
// import AccountCircleIcon from '@material-ui/icons/AccountCircle';
// import FingerprintIcon from '@material-ui/icons/Fingerprint';
// import MarkunreadMailboxIcon from '@material-ui/icons/MarkunreadMailbox';
// import LocationCityIcon from '@material-ui/icons/LocationCity';
// import MapIcon from '@material-ui/icons/Map';
// import FlagIcon from '@material-ui/icons/Flag';
// import SaveIcon from '@material-ui/icons/Save';
// import HomeIcon from '@material-ui/icons/Home';
import EditIcon from '@material-ui/icons/Edit';
// import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
// import EuroIcon from '@material-ui/icons/Euro';
// import ReceiptIcon from '@material-ui/icons/Receipt';
// import WarningIcon from '@material-ui/icons/Warning';
import picLogo from './picLogo.png'
import Resizer from 'react-image-file-resizer';
import { NotifContext } from '../../Context/NotifContext';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import Autocomplete from '../../Components/MapRender/Autocomplete'
import { AuthContext } from '../../Context/AuthContext';
import { useEffect } from 'react';


const NewAlert = () => {

    const Notif = useContext(NotifContext)
    const AuthCtx = useContext(AuthContext)

    const [AlertData, setAlertData] = useState({
        alertAddress: "",
        alertType: "Low",
        alertName: "",
        alertDescription: "",
        alertDate: Date.now(),
        alertPicture: "",
        alertOwner: "",
    })

    useEffect(() => {
        AuthCtx.auth.user.isUser && setAlertData({...AlertData, alertOwner: AuthCtx.auth.user.uid})
                // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [AuthCtx])

    const handleAlertPicChange = e => {
        var fileInput = false
        if (!e.target.files[0] || !e.target.files[0].name.match(/.(jpg|jpeg|ico|png|gif)$/i)) {
            Notif.run({type: "error", msg: "Formato de archivo incorrecto. Aceptamos .jpg .jpeg .ico .png o .gif"})
        } else {
            if (e.target.files[0]) {
                fileInput = true
            }
        }
        if (fileInput) {
            Resizer.imageFileResizer(
                e.target.files[0],
                400, //maxWidth
                400, //maxHeight
                'JPEG', //format
                100, //quality
                0, //rotation
                uri => {
                    document.getElementById('AlertPic').src = uri
                    setAlertData({...AlertData, alertPicture: uri})
                },
                'base64' //output
            )
        }
    }

    const handleAlertData = e => {
        console.log('handleAlertData')
        let name = e.target.name
        let value = e.target.value
        setAlertData({...AlertData, [name]: value})
    }

    const latLngHandler = (latLng, address) => {
        setAlertData({ ...AlertData, alertAddress: {
            latitude: latLng.lat,
            longitude: latLng.lng,
            address: address            
        }
        })
    }

    return (
        <>
            <div className="AlertData">
            <h3 style={{textAlign:"center"}}>Notificar nueva alerta</h3>
                <TextField
                    multiline
                    className="textField"
                    name="alertName"
                    size="small"
                    fullWidth={true}
                    label="Nombre"
                    placeholder="Nombre de la alerta"
                    onChange={handleAlertData}
                    InputProps={{startAdornment: (<InputAdornment position="start"><EditIcon/></InputAdornment>),}}
                    />

                <h5 style={{textAlign:"center"}}>Intensidad de la alerta</h5>
                <FormControl className="chooseClientDiv">
                    <NativeSelect
                    fullWidth={true}
                    select="true" 
                    variant='filled'
                    onChange={handleAlertData}
                    defaultValue="Low"
                    inputProps={{
                        name: 'alertType',
                        id: 'alertType',
                    }}
                    >
                        <option value={"Low"}>Baja</option>
                        <option value={"Medium"}>Media</option>
                        <option value={"High"}>Alta</option>
                    </NativeSelect>
                    <FormHelperText>Elige un tipo de alerta acorde a la necesidad</FormHelperText>
                </FormControl>
                    <br></br><br></br>
                    <Autocomplete handler={latLngHandler}></Autocomplete>
                    <br></br>
                <TextField
                    multiline
                    rows={4}
                    className="textField"
                    name="alertDescription"
                    size="small"
                    fullWidth={true}
                    label="Descripción"
                    placeholder="Ej: Árbol caído, carretera cortada"
                    onChange={handleAlertData}
                    InputProps={{startAdornment: (<InputAdornment position="start"><EditIcon/></InputAdornment>),}}
                    />
                    <br></br>
                    <h3 style={{textAlign:"center"}}>Foto de la alerta</h3>
                <div className="AlertPicDiv">
                    <img id="AlertPic" className="AlertPic" src={picLogo} alt="userPic"></img>
                </div>

                <div className="AlertFileDiv">
                <input onChange={handleAlertPicChange} type="file" id="AlertFile" className="inputFile"></input>
                <label htmlFor="AlertFile">

                        <div style={{display:"flex"}}>
                            <CameraAltIcon className="UserPicFileIcon"/>
                            <p>subir foto</p>
                        </div>  
                    </label>
                </div>
                
            </div>
        </>
    );
}
    
export default NewAlert;
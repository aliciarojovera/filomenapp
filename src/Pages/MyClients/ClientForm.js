import './ClientForm.css'
import {TextField, InputAdornment, Button} from '@material-ui/core'
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import HomeIcon from '@material-ui/icons/Home';
import MarkunreadMailboxIcon from '@material-ui/icons/MarkunreadMailbox';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import MapIcon from '@material-ui/icons/Map';
import FlagIcon from '@material-ui/icons/Flag';
import SaveIcon from '@material-ui/icons/Save';
import { useContext, useState } from 'react';
import { db } from '../../firebase';
import { AuthContext } from '../../Context/AuthContext';

const ClientForm = () => {

    const [client, setClient] = useState({})
    const authCtx = useContext(AuthContext)

    const [divClass, setClass] = useState({open: false})

    const handleClick = () => {
        setClass({open: !divClass.open})
    }

    const handleInputChange = e => {
        const name = e.target.name
        const value = e.target.value
        setClient({...client, [name]: value})
    }

    const handleSubmit = () => {
        if (!client.clientName) {
            alert('El nombre es requerido')
        } else {
            db.collection('users').doc(authCtx.auth.user.uid).collection('userClients').doc().set(client)
        }
    }

    return ( 
        <>
        <h3 style={{textAlign:"center"}}>Añadir Nuevo Cliente</h3>
        <div className="tab2">
        {/* <input type="checkbox" id="chck1" /> */}
        <label className={divClass.open ? "tab2-label open": "tab2-label"} onClick={handleClick}>Nuevo Cliente</label>
        <div className={divClass.open ? "tab2-content open": "tab2-content"}>
        <div className="mainDataForm2">
        <br/>
            <TextField
                name="clientName"
                size="small"
                fullWidth={true}
                label="Nombre"
                placeholder="Nombre y apellidos o nombre de la compañía"
                onChange={handleInputChange}
                InputProps={{startAdornment: (<InputAdornment position="start"><AccountBoxIcon/></InputAdornment>),}}
                />
            <br/><br/>
            <TextField
                name="clientNIF"
                size="small"
                fullWidth={true}
                label="NIF / CIF"
                placeholder="NIF / CIF"
                onChange={handleInputChange}
                InputProps={{startAdornment: (<InputAdornment position="start"><FingerprintIcon/></InputAdornment>),}}
                />
            <br/><br/>
            <TextField
                name="clientAddress"
                size="small"
                fullWidth={true}
                label="Dirección"
                placeholder="Dirección"
                onChange={handleInputChange}
                InputProps={{startAdornment: (<InputAdornment position="start"><HomeIcon/></InputAdornment>),}}
                />
            <br/><br/>
            <TextField
                name="clientPostalCode"
                size="small"
                fullWidth={true}
                label="Código Postal"
                placeholder="Código Postal"
                onChange={handleInputChange}
                InputProps={{startAdornment: (<InputAdornment position="start"><MarkunreadMailboxIcon/></InputAdornment>),}}
                />
            <br/><br/>
            <TextField 
                name="clientCity"
                size="small"
                fullWidth={true}
                label="Ciudad"
                placeholder="Ciudad"
                onChange={handleInputChange}
                InputProps={{startAdornment: (<InputAdornment position="start"><LocationCityIcon/></InputAdornment>),}}
                />
            <br/><br/>
            <TextField 
                name="clientState"
                size="small"
                fullWidth={true}
                label="Provincia"
                placeholder="Provincia"
                onChange={handleInputChange}
                InputProps={{startAdornment: (<InputAdornment position="start"><MapIcon/></InputAdornment>),}}
                />
            <br/><br/>
            <TextField 
                name="clientCountry"
                size="small"
                fullWidth={true}
                label="País"
                placeholder="País"
                onChange={handleInputChange}
                InputProps={{startAdornment: (<InputAdornment position="start"><FlagIcon/></InputAdornment>),}}
                />

            <br/><br/>
            <Button 
                className="saveBtn"
                variant="contained"
                color="secondary"
                onClick={() => handleSubmit()}
                fullWidth={true}
                startIcon={<SaveIcon />}
            >
            Guardar Cliente
            </Button>
            <br/><br/>
        </div>
            </div>
            </div>
            </>
    );
}
 
export default ClientForm;
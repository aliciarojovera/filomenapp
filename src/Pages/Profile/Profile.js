import { useContext, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import './Profile.css'
import Resizer from 'react-image-file-resizer';
import {db} from '../../firebase'
import Loader from '../../Shared/Loader/Loader'
import {TextField, Button, InputAdornment} from '@material-ui/core'
import {AccountCircle} from '@material-ui/icons'
import SaveIcon from '@material-ui/icons/Save';
import {fireAuth} from '../../firebase'
import {Link} from 'react-router-dom'
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import { NotifContext } from '../../Context/NotifContext';

const Profile = () => {

    const Notif = useContext(NotifContext)

    const [changes, setChanges] = useState({
        photoURL: null,
        displayName: null,
        changesReady: false,
    })

    const AuthCtx = useContext(AuthContext)

    const handlePicChange = e => {
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
                    document.getElementById('userPic').src = uri
                    setChanges({...changes, photoURL: uri, changesReady: true})
                },
                'base64' //output
            )
        }
    }


    const handleSubmit = () => {
        if (!changes.photoURL && !changes.displayName) {
            Notif.run({type: "error", msg:"Faltan datos por rellenar"})
        } else {
            db.collection('users').doc(AuthCtx.auth.user.uid).collection('userData').doc('userData').set({
                displayName: changes.displayName ? changes.displayName : AuthCtx.auth.user.displayName,
                photoURL: changes.photoURL ? changes.photoURL : AuthCtx.auth.user.photoURL
            })
            .then(() => {
                Notif.run({type: "success", msg:"Cambios guardados"})
                setChanges({...changes, changesReady:false})
            })
            .catch((err) => {
                Notif.run({type: "error", msg: err.message})
            })
        }
    }

    const handleInputChange = e => {
        let value = e.target.value
        setChanges({...changes, displayName: value, changesReady:true})
    }

    const myTrue = true

    return (
        <> 
            <h2 style={{textAlign:"center"}}>{AuthCtx.auth.isUser ? AuthCtx.auth.user.displayName : ""}</h2>
            <h4 style={{textAlign:"center"}}>{AuthCtx.auth.isUser ? AuthCtx.auth.user.email : ""}</h4>
            <div className="userPicDiv">
                {AuthCtx.auth.isUser ?
                <img id="userPic" className="userPic" src={AuthCtx.auth.user.photoURL} alt="userPic"></img>
                : <Loader/> }

            </div>

            <div className="userPicFileDiv">
                <input onChange={handlePicChange} type="file" id="UserPicFile" className="inputFile"></input>
                <label htmlFor="UserPicFile">

                        <div style={{display:"flex"}}>
                            <CameraAltIcon className="UserPicFileIcon"/>
                            <p>Actualizar foto</p>
                        </div>  
                    </label>
            </div>
            <br/>
            
            <div className="userPicDiv">
                <TextField 
                id="input-with-icon-grid" 
                label="User Name"
                placeholder={AuthCtx.auth.isUser ? AuthCtx.auth.user.displayName : ""}
                onChange={handleInputChange}
                InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}

                />
                </div>

                  <br></br>
            <div style={{textAlign:"center"}}>
                <Button 
                variant={changes.changesReady ? "contained" : "outlined"} 
                color={changes.changesReady ? "secondary" : "default"} 
                onClick={() => handleSubmit()}
                startIcon={<SaveIcon />}
                >Guardar Cambios</Button>
            </div>
            <br/><br/><br/>
            <div className="LogoutBtnDiv">
                <Link to="/" style={{ textDecoration: 'none' }}>
                <Button
                className="LogoutBtn"
                variant="contained"
                color="default"
                fullWidth={myTrue}
                size="large"
                onClick={() => fireAuth.signOut()}
                >Cerrar Sesión</Button>
                </Link>
            </div>
            

        </>
    );
}
 
export default Profile;
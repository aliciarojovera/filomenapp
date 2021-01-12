import { AuthContext } from "../../Context/AuthContext";
import {useContext, useState} from 'react'
import './Bridge.css'
import {Button} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';
import { Redirect } from "react-router-dom";

const Bridge = () => {

    const authCtx = useContext(AuthContext)
    const [redirect, setRedirect] = useState({redirect: false})

    const handleRedirect = () => {
        setRedirect({redirect: true})
    }
    
    return (
        <div className="bridgeMain">
            <div className="bridgeLeft">
            <img
                    src={authCtx.auth.isUser ? authCtx.auth.user.photoURL : ""}
                    className="BarUserPic"
                    width="80"
                    height="80"
                    style={{borderRadius:"50%"}}
                    alt={authCtx.auth.isUser ? authCtx.auth.user.displayName: "UserPhoto"}
                />
            <div style={{textAlign:"center"}}>{authCtx.auth.isUser ? authCtx.auth.user.displayName: ""}</div>
            </div>
            <br></br>
            <div className="bridgeRight">
            <Button 
                className="column"
                variant="contained"
                color="secondary"
                onClick={handleRedirect}

                startIcon={<EditIcon />}
            >
            Editar perfil
            </Button>

            </div>
            {redirect.redirect ? <Redirect to="/profile"/>: null}
        </div>
        
    );
}
 
export default Bridge;
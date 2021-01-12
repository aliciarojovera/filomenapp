import './FirstTime.css'
import { Button } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';
import WarningIcon from '@material-ui/icons/Warning';

const FirstTime = () => {
    return (
        <>
            <div className="FirsTimeMainDiv">
                <WarningIcon style={{width:"50px", height:"50px", color:"orange"}}/>
                <h3> ¿Tu primera vez en FilomenApp? </h3>
                <h4>Prueba a revisar los últimos avisos o a dar la situación de tus calles cercanas</h4>
                <Link to="/mydata" className="goToMyDataLink">
                    <Button 
                    className="goToMyDataBtn"
                    variant="contained"
                    color="secondary"
                    startIcon={<EditIcon />}
                    >
                    Notificar nueva alerta
                    </Button>
                </Link>
                <h4>Por favor, haz un buen uso de la aplicación</h4>
            </div>
        </>
    );
}
 
export default FirstTime;
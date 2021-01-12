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
                <h3> ¿Tu primera vez en Facturator? </h3>
                <h4>Para empezar, rellena los datos que aparecerán en tu factura</h4>
                <Link to="/mydata" className="goToMyDataLink">
                    <Button 
                    className="goToMyDataBtn"
                    variant="contained"
                    color="secondary"
                    startIcon={<EditIcon />}
                    >
                    Ir a mis datos
                    </Button>
                </Link>
                <h4>Después, podrás crear tus clientes y hacer tus facturas</h4>
            </div>
        </>
    );
}
 
export default FirstTime;
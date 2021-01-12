import './NewInvDate.css'
import {TextField, InputAdornment} from '@material-ui/core'
import TodayIcon from '@material-ui/icons/Today';
import EventIcon from '@material-ui/icons/Event';

const NewInvNum = props => {

    return (
        <>
            <div className="newInvDateMain">
                <TextField
                    multiline
                    className="textField"
                    defaultValue={props.defaultStart}
                    name=""
                    size="small"
                    fullWidth={true}
                    label="Fecha de emisión (día/mes/año)"
                    placeholder="Fecha de emisión (día/mes/año)"
                    onChange={props.onStartChange}
                    InputProps={{startAdornment: (<InputAdornment position="start"><TodayIcon/></InputAdornment>),}}
                    />

                <TextField
                    multiline
                    className="textField"
                    defaultValue={props.defaultEnd}
                    name=""
                    size="small"
                    fullWidth={true}
                    label="Fecha de vencimiento (30 días)"
                    placeholder="Fecha de vencimiento (30 días por defecto)"
                    onChange={props.onEndChange}
                    InputProps={{startAdornment: (<InputAdornment position="start"><EventIcon/></InputAdornment>),}}
                    />
            </div>
        </>
    );
}
 
export default NewInvNum;
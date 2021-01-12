import './NewInvField.css'
import {TextField, InputAdornment} from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import MarkunreadMailboxIcon from '@material-ui/icons/MarkunreadMailbox';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import MapIcon from '@material-ui/icons/Map';
import FlagIcon from '@material-ui/icons/Flag';
import SaveIcon from '@material-ui/icons/Save';
import HomeIcon from '@material-ui/icons/Home';
import EditIcon from '@material-ui/icons/Edit';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import EuroIcon from '@material-ui/icons/Euro';
import ReceiptIcon from '@material-ui/icons/Receipt';

const NewInvField = props => {

    const handleIcon = icon => {
        if (icon === "AccountCircleIcon") {
            return <AccountCircleIcon/>
        } if (icon === "FingerprintIcon") {
            return <FingerprintIcon/>
        } if (icon === "MarkunreadMailboxIcon") {
            return <MarkunreadMailboxIcon/>
        } if (icon === "LocationCityIcon") {
            return <LocationCityIcon/>
        } if (icon === "MapIcon") {
            return <MapIcon/>
        } if (icon === "FlagIcon") {
            return <FlagIcon/>
        } if (icon === "SaveIcon") {
            return <SaveIcon/>
        } if (icon === "HomeIcon") {
            return <HomeIcon/>
        } if (icon === "PlaylistAddIcon") {
            return <PlaylistAddIcon/>
        } if (icon === "EditIcon") {
            return <EditIcon/>
        } if (icon === "EuroIcon") {
            return <EuroIcon/>
        } if (icon === "ReceiptIcon") {
            return <ReceiptIcon/>
        }
    }

    return (
        <> {props.value ? 
            <TextField
            multiline
            className="textField"
            value={props.value ? props.value : ""}
            name={props.name}
            size="small"
            fullWidth={true}
            label={props.label}
            placeholder={props.label}
            onChange={props.onChange}
            InputProps={{startAdornment: (<InputAdornment position="start">{handleIcon(props.icon)}</InputAdornment>),}}
            />
            :
            <TextField
            multiline
            className="textField"
            defaultValue={props.defaultValue}
            name={props.name}
            size="small"
            fullWidth={true}
            label={props.label}
            placeholder={props.label}
            onChange={props.onChange}
            InputProps={{startAdornment: (<InputAdornment position="start">{handleIcon(props.icon)}</InputAdornment>),}}
            />
        }

        </>
    );
}
 
export default NewInvField;
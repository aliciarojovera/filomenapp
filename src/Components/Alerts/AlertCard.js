import { useContext } from 'react';
import { ThemeContext } from '../../Context/ThemeContext';
import './AlertCard.css'
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
const AlertCard = props => {

    const Theme = useContext(ThemeContext)

    return (
        <div className={Theme.Theme.isDark ? "Dark card" : "card"}>
            <div className="headerCard">
                <div className="profileData">
                    <img className="profileImg" src="https://res.cloudinary.com/aliciarojo/image/upload/v1608244428/fotos-webuild/lpfbjew7kb60zaiaxbs7.jpg"></img>
                    <h3 className="profileName">
                        Phoebe  <p className="date">03/01/20 20:38</p> <p className="date location">Calle Raimundo Lulio</p>
                    </h3>
                </div>
                <div id={props.alertType} className="triangle"><div className="prueba"><h1>!</h1></div></div>
            </div>
            <div className="flex">
                <p>Ha habido un derrumbamiento de arboles en raimundo lulio y ha venido la polixia lorem uhdsxuyfgyis gfsdyghfiuhsudhfiuhf siudhfiuhd fhisdhfiuhdiuf hsidu hfiusdhfiudhsfiuhsdiu fhisdhfidiuhdiufh dhfudu dfohfh fdsihuf dsofhsdif psdiufuosdfnkdf idshfosd dsfjidoun toryjiot iotero rontrot oirtuh roitrt ldfig </p>
                <img className={props.image ? "imageCard" : "none"} src="https://static2.abc.es/media/play/2020/11/13/baby-yoda-kSQH--1200x630@abc.jpg"></img>
            </div>
            <div className="likes">
                <p>¿Es útil esta información?</p>
                <div className="flexlike"><ThumbUpAltIcon style={{ cursor: "pointer" }}></ThumbUpAltIcon> <p>10</p></div>
               
                <div className="flexlike"> <ThumbDownIcon style={{cursor:"pointer"}}></ThumbDownIcon> <p>1</p></div>
                        

            </div>
        </div>

    );
}
 
export default AlertCard;
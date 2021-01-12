import { useContext } from 'react';
import { ThemeContext } from '../../Context/ThemeContext';
import './AlertList.css'
import AlertCard from './AlertCard.js'
const AlertList = () => {

    const Theme = useContext(ThemeContext)

    return (
        <div className={Theme.Theme.isDark ? "Dark AlertList" : "AlertList"}>
          
            <AlertCard alertType="low"></AlertCard>
                <AlertCard alertType="medium"></AlertCard>
                <AlertCard alertType="high" image="jdfb"></AlertCard>


          
        </div>

    );
}

export default AlertList;
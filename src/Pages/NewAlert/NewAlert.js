import { useState } from 'react';
import './NewAlert.css'

const NewAlert = () => {

    const [AlertData, setAlertData] = useState({
        street: "",
        type: "",
        name: "",
        description: "",
        date: "",
        picture: "",
        owner: "",
        
    })
    return (
        <>
            <h1>Im New Alert</h1>
        </>
    );
}
    
export default NewAlert;
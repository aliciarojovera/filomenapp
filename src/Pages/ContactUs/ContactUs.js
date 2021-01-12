import { useState } from 'react'
import {TextField, InputAdornment, Button } from '@material-ui/core'
import EmailIcon from '@material-ui/icons/Email';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import EditIcon from '@material-ui/icons/Edit';
import Axios from 'axios'


import './ContactUs.css'

const ContactUs = () => {

    const [mail, setMail] = useState({to:"carlosrenemail@gmail.com", message:"", name:"", email:""})

    const handleChange = e => {
        const [name, value] = [e.target.name, e.target.value]
        console.log('name: ', name, 'value:', value)
        setMail({...mail, [name]: value})
    }

    const handleSubmit = event => {
        event.preventDefault()
        sendEmail()
        setMail({
            ...mail,
            name: '',
            email: '',
            message: '',
        })
    }

    const sendEmail = () => {
    Axios.post(
        'https://us-central1-facturator-app.cloudfunctions.net/submit',
        mail
    )
        .then(res => {
            console.log(res)
            setMail({...mail, 
                message: "",
                name: "",
                email: ""})
        })
        .catch(error => {
        console.log(error)
        })
    }

    return (
        <>
            <h2 style={{textAlign:"center"}}>Contacta con nosotros</h2>
            <br></br>
            <div className="mailForm">
            <TextField
                name="name"
                size="small"
                fullWidth={true}
                label="Nombre"
                placeholder="Nombre"
                onChange={handleChange}
                InputProps={{startAdornment: (<InputAdornment position="start"><AccountBoxIcon/></InputAdornment>),}}
                />
                <br></br><br></br>
            <TextField
                name="email"
                size="small"
                fullWidth={true}
                label="Email"
                placeholder="Email"
                onChange={handleChange}
                InputProps={{startAdornment: (<InputAdornment position="start"><EmailIcon/></InputAdornment>),}}
                />
                <br></br><br></br>
            <TextField
                rows="5"
                multiline
                name="message"
                size="small"
                fullWidth={true}
                label="Mensaje"
                placeholder="Mensaje"
                onChange={handleChange}
                InputProps={{startAdornment: (<InputAdornment position="start"><EditIcon/></InputAdornment>),}}
                />

            <br></br><br></br>
            <Button 
                className="install-button"
                variant="contained"
                color="secondary"
                onClick={handleSubmit}
                fullWidth={true}
                startIcon={<EmailIcon />}
            >
            Enviar mensaje
            </Button>


            </div>
        </>
    )
}

export default ContactUs
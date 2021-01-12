import './MyClients.css'
import ClientForm from './ClientForm'
import ClientList from './ClientList'

const MyClients = () => {
    return (
        <>
        <h1 style={{textAlign:"center"}}>Mis Clientes</h1>
        <ClientForm/>
        <ClientList/>
        </>
    );
}
 
export default MyClients;
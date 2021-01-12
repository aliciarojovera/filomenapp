import './Home.css'
import Landing from './Landing'
import ThreeColumns from './ThreeColumns'
import LandingImg1 from '../../Shared/Images/LandingImg1.jpg'
import LandingImg2 from '../../Shared/Images/LandingImg2.jpg'
import { useContext } from 'react'
import { AppContext } from '../../Context/AppContext'
import FirstTime from './FirstTime'


const Home = () => {

    const app = useContext(AppContext)
  
    return ( 
        <>
            {app.app.firstTime && <FirstTime/>}
            <Landing to="/newinvoice" hero="hero1" msg="La gestión de tus facturas, gratis y más fácil que nunca" btn="empezar ya" img={LandingImg1}/>
            <ThreeColumns/>
            <Landing to="contactus" hero="hero1" msg="¿Necesitas esta tecnología para tu PYME o empresa?" btn="Contacta con nosotros" img={LandingImg2}/>
        </>
    );
}
 
export default Home;
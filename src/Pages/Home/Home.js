import './Home.css'
import Landing from './Landing'
import ThreeColumns from './ThreeColumns'
// import LandingImg1 from '../../Shared/Images/LandingImg1.jpg'
// import LandingImg2 from '../../Shared/Images/LandingImg2.jpg'
import { useContext } from 'react'
import { AppContext } from '../../Context/AppContext'
import FirstTime from './FirstTime'


const Home = () => {

    const app = useContext(AppContext)
  
    return ( 
        <>
            {app.app.firstTime && <FirstTime/>}
            <Landing to="/newinvoice" hero="hero1" msg="Estado de tu zona, gratis y más fácil que nunca" btn="Reportar incidente" img="https://res.cloudinary.com/aliciarojo/image/upload/v1610479454/javygo-7KFmBUfzkUg-unsplash_2_jukg3l.jpg"/>
            <ThreeColumns/>
            <Landing to="contactus" hero="hero1" msg="Este es un proyecto de código abierto" github="true" btn="Contacta con nosotros" img="https://res.cloudinary.com/aliciarojo/image/upload/v1610484175/tracy-adams-_4HiCxdOBLU-unsplash_1_tcbxwg.jpg" />
        </>
    );
}
 
export default Home;
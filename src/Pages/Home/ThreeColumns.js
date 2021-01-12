import { Link } from 'react-router-dom';
import './ThreeColumns.css'

const ThreeColumns = () => {
    return (
        <>
<div className="pricing-box-container">
  <div className="pricing-box text-center">
    <p className="price">Accede al estado de las carreteras</p>
    <ul className="features-list">
      <li><strong>Accede cuándo y donde quieras</strong></li>
      <li><strong>Revisa y actualiza los avisos de tu zona</strong></li>
      <li><strong></strong></li>
    </ul>
    {/* <button className="btn-primary">Get Started</button> */}
  </div>
          <div className="pricing-box pricing-box-bg-image text-center" style={{ backgroundImage: `url("https://res.cloudinary.com/aliciarojo/image/upload/v1610482746/image_1_vwc2pl.png")` }}>
    <p className="price">MAPA</p>
    <ul className="features-list">
      <li><strong>Accede al mapa para ver las alertas de tu zona</strong></li>
      
      <li><strong>Sin publicidad</strong></li>
    </ul>
    <Link to="/newinvoice">
      <button className="btn-primary">ver mapa</button>
    </Link>
  </div>
  <div className="pricing-box text-center">
    <p className="price">Tus datos están seguros</p>
    <ul className="features-list">
      <li><strong>Nos comprometemos a no usar tus datos</strong></li>
      <li><strong>y respetar tu privacidad</strong></li>
     
    </ul>
  </div>
</div>

        </>
    );
}
 
export default ThreeColumns;
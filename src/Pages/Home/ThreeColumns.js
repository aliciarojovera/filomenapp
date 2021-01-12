import { Link } from 'react-router-dom';
import './ThreeColumns.css'

const ThreeColumns = () => {
    return (
        <>
<div className="pricing-box-container">
  <div className="pricing-box text-center">
    <p className="price">Fácil</p>
    <ul className="features-list">
      <li><strong>Añade tus datos de facturación</strong></li>
      <li><strong>Añade a tus clientes</strong></li>
      <li><strong>Crea tus facturas</strong></li>
      <li><strong>Editalas y descargalas</strong></li>
    </ul>
    {/* <button className="btn-primary">Get Started</button> */}
  </div>
  <div className="pricing-box pricing-box-bg-image text-center">
    <p className="price">GRATIS</p>
    <ul className="features-list">
      <li><strong>Clientes ilimitados</strong></li>
      <li><strong>Facturas ilimitadas</strong></li>
      <li><strong>Sin planes de precios</strong></li>
      <li><strong>Sin publicidad</strong></li>
    </ul>
    <Link to="/newinvoice">
      <button className="btn-primary">empezar ahora</button>
    </Link>
  </div>
  <div className="pricing-box text-center">
    <p className="price">En la nube</p>
    <ul className="features-list">
      <li><strong>Accede cuándo y dónde quieras</strong></li>
      <li><strong>Instala la app en tu móvil</strong></li>
      <li><strong>Cambios en tiempo real</strong></li>
      <li><strong>¿Necesitas algo más? </strong><Link className="cuentanos" to="/contactus"><strong>cuéntanoslo</strong></Link></li>
    </ul>
  </div>
</div>

        </>
    );
}
 
export default ThreeColumns;
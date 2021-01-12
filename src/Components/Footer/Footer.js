import { useContext } from 'react';
import { ThemeContext } from '../../Context/ThemeContext';
import './Footer.css'

const Footer = () => {

    const Theme = useContext(ThemeContext)

    return ( 
        <footer className={Theme.Theme.isDark ? "Dark" : ""}>
            <div className="mainFooterTitle">
                © 2021 FACTURATOR
            </div>
        </footer>
    );
}
 
export default Footer;
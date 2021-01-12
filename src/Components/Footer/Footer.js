import { useContext } from 'react';
import { ThemeContext } from '../../Context/ThemeContext';
import './Footer.css'

const Footer = () => {

    const Theme = useContext(ThemeContext)

    return ( 
        <footer className={Theme.Theme.isDark ? "Dark" : ""}>
            <div className="mainFooterTitle">
                Madrid © 2021 FilomenApp es un proyecto independiente y sin ánimo de lucro
            </div>
        </footer>
    );
}
 
export default Footer;
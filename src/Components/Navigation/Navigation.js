import './Navigation.css'
import Logo from '../../Shared/Logo/Logo.png'
import NoUserWhite from '../../Shared/Images/NoUserWhite.png'
import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'
import Installer from '../../Components/Installer/Installer'
import PostAddIcon from '@material-ui/icons/PostAdd';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import CreateIcon from '@material-ui/icons/Create';
import { ThemeContext } from '../../Context/ThemeContext'

const Navigation = () => {

  const authCtx = useContext(AuthContext)
  const Theme = useContext(ThemeContext)

  const [burger, setBurger] = useState({
    burger1: "spinner diagonal part-1",
    burger2: "spinner horizontal",
    burger3: "spinner diagonal part-2",
    sidebar: "sidebarMenu",
    SubSidebar: "SubSidebarMenu",
    open: false,
  })

  const handleBurgerClick = () => {
    if (burger.open === false) {
      setBurger({
        burger1: "spinner diagonal part-1 Checked",
        burger2: "spinner horizontal Checked",
        burger3: "spinner diagonal part-2 Checked",
        sidebar: "sidebarMenu Checked",
        SubSidebar: "SubSidebarMenu Checked",
        open: true,
      })
    } else {
      setBurger({
        burger1: "spinner diagonal part-1",
        burger2: "spinner horizontal",
        burger3: "spinner diagonal part-2",
        sidebar: "sidebarMenu",
        SubSidebar: "SubSidebarMenu",
        open: false,
      })
    }
  }

  const handleHideClick = () => {
    setBurger({
      burger1: "spinner diagonal part-1",
      burger2: "spinner horizontal",
      burger3: "spinner diagonal part-2",
      sidebar: "sidebarMenu",
      SubSidebar: "SubSidebarMenu",
      open: false,
    })
  }

  const NoUser = NoUserWhite

  const handleThemeClick = e => {
    // e.target.checked ? Theme.setTheme({isDark: true}) : Theme.setTheme({isDark: false})
    if (e.target.checked) {
      Theme.setTheme({isDark: true})
      localStorage.setItem('isDark', JSON.stringify(true))
    } else {
      Theme.setTheme({isDark: false})
      localStorage.setItem('isDark', JSON.stringify(false))
    }
  }

  return (
    <>
      <div className={Theme.Theme.isDark ? "Navbar Dark" : "Navbar"}>
        <div className="Burger" onClick={() => handleBurgerClick()}>
          <div className={burger.burger1}></div>
          <div className={burger.burger2}></div>
          <div className={burger.burger3}></div>
        </div>

        <Link onClick={() => handleHideClick()} to="/" style={{margin:"0 auto", marginLeft:"calc(50% - 20px)"}}>
          <img src={Logo} width="40" height="40" style={{marginTop:"10px"}} alt="myAlt"></img>
        </Link>

        <Link to={authCtx.auth.isUser ? "/mydata" : "/signin"} onClick={() => handleHideClick()}>
          <img 
          className="NavUserPic" 
          width="40"
          height="40"
          style={{borderRadius:"50%"}}
          alt={authCtx.auth.isUser ? authCtx.auth.user.displayName: "UserPhoto"}
          src={authCtx.auth.isUser ? authCtx.auth.user.photoURL : NoUser}
          />
          </Link>
      </div>
      <div className={burger.SubSidebar} onClick={() => handleHideClick()}></div>

      {/* MODAL */}
      {/* <div className={burger.sidebar}> */}
      <div className={[burger.sidebar, Theme.Theme.isDark ? "Navbar Dark" : "Navbar"].join(" ")}>

          <Link onClick={() => handleHideClick()} className="BarLink" to={authCtx.auth.isUser ? "/mydata" : "/signin"}>
          <li>
          <img
                src={authCtx.auth.isUser ? authCtx.auth.user.photoURL : NoUser}
                className="BarUserPic"
                width="80"
                height="80"
                style={{borderRadius:"50%", marginLeft:"30%", marginTop:"0px"}}
                alt={authCtx.auth.isUser ? authCtx.auth.user.displayName: "UserPhoto"}
              />
          <div style={{textAlign:"center"}}>{authCtx.auth.isUser ? authCtx.auth.user.displayName: "Inicia Sesión"}</div>
          </li>
          </Link>

        {/* LINKS */}
        <Link onClick={() => handleHideClick()} className="BarLink" to="/newinvoice"><li><PostAddIcon className="BarIcon"/> Nueva Factura</li></Link>
        <Link onClick={() => handleHideClick()} className="BarLink" to="/myinvoices"><li><LibraryBooksIcon className="BarIcon"/> Mis Facturas</li></Link>
        <Link onClick={() => handleHideClick()} className="BarLink" to="/myclients"><li><PeopleAltIcon className="BarIcon"/> Mis Clientes</li></Link>
        <Link onClick={() => handleHideClick()} className="BarLink" to="/mydata"><li><CreateIcon className="BarIcon"/> Mis Datos</li></Link>

        {/* INSTALLER */}
          <Installer/>

        {/* DARKMODE */}
        <li style={{textAlign:"center"}}>
          <label>DARK MODE </label><br></br><br></br>
          <label className="switch">
          {Theme.Theme.isDark ? 
            <input type="checkbox" onClick={handleThemeClick} defaultChecked/>
          : 
          <input type="checkbox" onClick={handleThemeClick}/>
          }
            <span className="slider round"></span>
          </label>
        </li>
      </div>
    </>
  );
}
 
export default Navigation;
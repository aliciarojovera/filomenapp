import Home from '../Home/Home';
import Profile from '../Profile/Profile';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import {AuthContext} from '../../Context/AuthContext'
import { NotifProvider } from '../../Context/NotifContext'
import Navigation from '../../Components/Navigation/Navigation'
import SignIn from '../SignIn/SignIn';
import Footer from '../../Components/Footer/Footer';
import { useContext, useEffect } from 'react';
import NewInvoice from '../NewInvoice/NewInvoice';
import MyInvoices from '../MyInvoices/MyInvoices';
import MyClients from '../MyClients/MyClients';
import MyData from '../MyData/MyData';
import ContactUs from '../ContactUs/ContactUs'
import RenderInvoice from '../RenderInvoice/RenderInvoice'
import { ThemeContext } from '../../Context/ThemeContext';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import NewAlert from '../NewAlert/NewAlert';
import Alerts from '../Alerts/Alerts';
import Map from '../Map/Map';

function App() {

  const authCtx = useContext(AuthContext)
  const Theme = useContext(ThemeContext)

  useEffect(() => {
    if (Theme.Theme.isDark) {
      document.body.classList.add('Dark');
    } else {
      document.body.classList.remove('Dark');
    }
  }, [Theme.Theme])

  const Theme2 = createMuiTheme({
    palette:{
      type: Theme.Theme.isDark ? 'dark' : 'light'
    }
  })

  return (

      <ThemeProvider theme={Theme2}>
          <NotifProvider>
            <BrowserRouter>
              <Navigation/>
                <Switch>
                  <Route path="/profile">{authCtx.auth.isUser ? <Profile/> : <Redirect to="/signin"/>}</Route>
                  <Route path="/newinvoice">{authCtx.auth.isUser ? <NewInvoice/> : <Redirect to="/signin"/>}</Route>
                  <Route path="/myinvoices">{authCtx.auth.isUser ? <MyInvoices/> : <Redirect to="/signin"/>}</Route>

                  <Route path="/newalert">{authCtx.auth.isUser ? <NewAlert/> : <Redirect to="/signin"/>}</Route>
                  <Route path="/alerts"><Alerts/></Route>
                  <Route path="/map">{authCtx.auth.isUser ? <Map/> : <Redirect to="/signin"/>}</Route>

                  <Route path="/myclients">{authCtx.auth.isUser ? <MyClients/> : <Redirect to="/signin"/>}</Route>
                  <Route path="/renderinvoice">{authCtx.auth.isUser ? <RenderInvoice/> : <Redirect to="/signin"/>}</Route>
                  <Route path="/contactus">{authCtx.auth.isUser ? <ContactUs/> : <Redirect to="/signin"/>}</Route>
                  <Route path="/mydata">{authCtx.auth.isUser ? <MyData/> : <Redirect to="/signin"/>}</Route>
                  <Route path="/signin"><SignIn/></Route>
                  <Route path="/"><Home/></Route>
                </Switch>
              <Footer/>
            </BrowserRouter>
        </NotifProvider>
      </ThemeProvider>
  );
}

export default App;

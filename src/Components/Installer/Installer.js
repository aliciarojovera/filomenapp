import React, { useEffect, useState } from 'react';
import './Installer.css';
import {Button} from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save';

let deferredPrompt;  
    
function Installer() {
  const [installable, setInstallable] = useState(false);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      // Update UI notify the user they can install the PWA
      setInstallable(true);
    });

    window.addEventListener('appinstalled', () => {
      // Log install to analytics
      console.log('INSTALL: Success');
    });
  }, []);

  const handleInstallClick = (e) => {
      // Hide the app provided install promotion
      setInstallable(false);
      // Show the install prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
      });
  };

  const myTrue = true
  
  return (
      <>
        {installable &&
        <li>
          <Button 
          className="install-button"
          variant="contained"
          color="secondary"
          onClick={handleInstallClick}
          fullWidth={myTrue}
          startIcon={<SaveIcon />}
          
          >
            INSTALL APP
          </Button>
          </li>
        }
    </>
  );
}

export default Installer;
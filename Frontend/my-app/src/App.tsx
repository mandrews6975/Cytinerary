import React, { useState } from 'react';
import {
  Button,
  ThemeProvider,
  createMuiTheme
} from '@material-ui/core'
import red from '@material-ui/core/colors/red';
import yellow from '@material-ui/core/colors/yellow';
import grey from '@material-ui/core/colors/grey';
import './App.css';
import NewEventModal from './components/dialog_windows/newEventModal'
import ShareScheduleDialogWindow from './components/dialog_windows/ShareScheduleDialogWindow';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: red[600]
    },
    secondary: {
      main: yellow[700]
    },
    type: 'dark',
    background: {
      paper: grey[800],
      default: grey[900]
    },
  },
  typography: {
    fontFamily: 'Roboto'
  }
});

function App() {
  const [showShareScheduleDialog, setShowShareScheduleDialog] = useState<boolean>(false);
  const [showNewEventDialog, setNewEventDialog] = useState<boolean>(false);

  return (
    <ThemeProvider
      theme={theme}
    >
      <div style={{
        display: 'flex',
        backgroundColor: 'white',
        height: window.innerHeight,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <ShareScheduleDialogWindow
          onClose={() => setShowShareScheduleDialog(false)}
          visible={showShareScheduleDialog}
        />
        <NewEventModal visible = {showNewEventDialog} user = {'111'} onClose = {() => {setNewEventDialog(false)}}/>
        <Button
          color='primary'
          variant='contained'
          onClick={() => setShowShareScheduleDialog(true)}
        >
          Share
        </Button>

        <Button color='primary' variant='contained' onClick = {() => {
          try{
            fetch('/getEvents', {
              method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  creator : "111"
                }),
            }).then((response) => response.json())
            .then((json) => {
              alert(JSON.stringify(json))
            });
          }catch(err){
            console.log(err);
          }
        }}>View this User's events</Button>

        <Button color='primary' variant='contained' onClick = {() => {setNewEventDialog(true)}}>Create a New Event</Button>
    </div>
    </ThemeProvider>
  );
}

export default App;

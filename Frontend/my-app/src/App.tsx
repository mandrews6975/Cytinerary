import React, { useState } from 'react';
import logo from './logo.svg';
import {
  Button,
  ThemeProvider,
  createMuiTheme
} from '@material-ui/core'
import red from '@material-ui/core/colors/red';
import yellow from '@material-ui/core/colors/yellow';
import grey from '@material-ui/core/colors/grey';
import './App.css';
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

  return (
    <ThemeProvider
      theme={theme}
    >
      <div style={{
        display: 'flex',
        backgroundColor: 'black',
        height: window.innerHeight,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <ShareScheduleDialogWindow
          onClose={() => setShowShareScheduleDialog(false)}
          visible={showShareScheduleDialog}
        />
        <Button
          color='primary'
          variant='contained'
          onClick={() => setShowShareScheduleDialog(true)}
        >
          Share
      </Button>
      </div>
    </ThemeProvider>
  );
}

export default App;

import React, {
  useState
} from 'react';
import logo from './logo.svg';
import {
  ThemeProvider,
  createMuiTheme
} from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import blueGrey from '@material-ui/core/colors/blueGrey';
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Paper,
  IconButton,
  Fab,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogTitle,
  Button,
  InputAdornment
} from '@material-ui/core';
import {
  Info,
  Add,
  Delete
} from '@material-ui/icons'
import './App.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[300]
    },
    secondary: {
      main: blueGrey[700]
    },
    type: 'dark',
    background: {
      paper: '#424242',
      default: '#303030'
    },
  },
  typography: {
    fontFamily: 'Roboto'
  }
});

function App() {

  const [number, setNumber] = useState(0);
  const [additionalBases, setAdditionalBases] = useState<number[]>([]);
  const [showAddBaseModal, setShowAddBaseModal] = useState(false);
  const [addBaseModalInput, setAddBaseModalInput] = useState('');
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <Fab color='primary'
        style={{ position: 'fixed', bottom: 50, right: 50, zIndex: 1 }}
        size='large'
        onClick={() => setShowAddBaseModal(true)}
        disabled={additionalBases.length == 30}
      >
        <Add />
      </Fab>
      <Dialog open={showAddBaseModal} onClose={() => setShowAddBaseModal(false)}>
        <DialogContent>
          <DialogContentText>Specify a base conversion block to add.</DialogContentText>
          <TextField variant='filled'
            label='Base'
            style={{
              width: '100%',
              fontSize: 30
            }}
            value={addBaseModalInput}
            onChange={(event) => {
              if (event.target.value == '' || Number.parseInt(event.target.value) > 36 || Number.parseInt(event.target.value) < 1) {
                setAddBaseModalInput('');
              } else if (!isNaN(Number.parseInt(event.target.value))) {
                setAddBaseModalInput(event.target.value);
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAddBaseModal(false)}>
            Cancel
          </Button>
          <Button onClick={() => {
            if (addBaseModalInput == '2' || addBaseModalInput == '8' || addBaseModalInput == '10' || addBaseModalInput == '16' || additionalBases.includes(Number.parseInt(addBaseModalInput))) {
              setShowAlertModal(true);
              return;
            } else if (addBaseModalInput == '1') {
              setShowErrorModal(true);
              return;
            }
            let newAdditionalBases = [...additionalBases];
            newAdditionalBases.push(Number.parseInt(addBaseModalInput));
            setAdditionalBases(newAdditionalBases);
            setShowAddBaseModal(false);
            setAddBaseModalInput('');
          }}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={showInfoModal} onClose={() => setShowInfoModal(false)}>
        <DialogTitle>Info</DialogTitle>
        <DialogContent>
          <Typography variant='body1'>Michael Andrews</Typography>
          <Typography variant='body1'>maa3@iastate.edu</Typography>
          <Typography variant='body1'>COM S 309</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowInfoModal(false)}>
            Close
        </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={showAlertModal} onClose={() => setShowAlertModal(false)}>
        <DialogContent>
          <Typography variant='body1'>Base conversion block already exists.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAlertModal(false)}>
            Close
        </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={showErrorModal} onClose={() => setShowErrorModal(false)}>
        <DialogContent>
          <Typography variant='body1'>Base cannot be less than 2.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowErrorModal(false)}>
            Close
        </Button>
        </DialogActions>
      </Dialog>
      <AppBar position='sticky' style={{ height: window.innerHeight * 0.07 }}>
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <Typography variant='h5' color='inherit'>Base Converter</Typography>
          <IconButton color='inherit'
            onClick={() => setShowInfoModal(true)}
          >
            <Info />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div style={{
        backgroundColor: theme.palette.background.default,
        minHeight: window.innerHeight * 0.93,
        flex: 1
      }}>
        <Container style={{ padding: '30px' }}>
          <Paper style={{ marginBottom: '30px' }}>
            <TextField variant='filled'
              label='HEX'
              style={{
                width: '100%',
                marginBottom: '30px',
                fontSize: 30
              }}
              value={number.toString(16)}
              onChange={(event) => {
                if (event.target.value == '') {
                  setNumber(0);
                } else {
                  let num = Number.parseInt(event.target.value, 16);
                  setNumber(Number.parseInt(num.toString(10)));
                }
              }}
            />
            <TextField variant='filled'
              label='DEC'
              style={{
                width: '100%',
                marginBottom: '30px',
                fontSize: 30
              }}
              value={number.toString(10)}
              onChange={(event) => {
                if (event.target.value == '') {
                  setNumber(0);
                } else {
                  let num = Number.parseInt(event.target.value, 10);
                  setNumber(Number.parseInt(num.toString(10)));
                }
              }}
            />
            <TextField variant='filled'
              label='OCT'
              style={{
                width: '100%',
                marginBottom: '30px',
                fontSize: 30
              }}
              value={number.toString(8)}
              onChange={(event) => {
                if (event.target.value == '') {
                  setNumber(0);
                } else {
                  let num = Number.parseInt(event.target.value, 8);
                  setNumber(Number.parseInt(num.toString(10)));
                }
              }}
            />
            <TextField variant='filled'
              label='BIN'
              style={{
                width: '100%',
                fontSize: 30
              }}
              value={number.toString(2)}
              onChange={(event) => {
                if (event.target.value == '') {
                  setNumber(0);
                } else {
                  let num = Number.parseInt(event.target.value, 2);
                  setNumber(Number.parseInt(num.toString(10)));
                }
              }}
            />
          </Paper>
          {additionalBases.length > 0 && <Paper>
            {additionalBases.map((base: number, index: number, array: number[]) => (
              <TextField variant='filled'
                label={`BASE ${base}`}
                style={{
                  width: '100%',
                  marginBottom: index < array.length - 1 ? '30px' : 0,
                  fontSize: 30
                }}
                InputProps={{
                  endAdornment: <InputAdornment position='end'>
                    <IconButton onClick={() => {
                      let newAdditionalBases = [...additionalBases];
                      newAdditionalBases.splice(index, 1);
                      setAdditionalBases(newAdditionalBases);
                    }}>
                      <Delete />
                    </IconButton>
                  </InputAdornment>
                }}
                value={number.toString(base)}
                onChange={(event) => {
                  if (event.target.value == '') {
                    setNumber(0);
                  } else {
                    let num = Number.parseInt(event.target.value, base);
                    setNumber(Number.parseInt(num.toString(10)));
                  }
                }}
                key={`${base}-${index}`}
              />
            ))}
          </Paper>}
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;

import React, {
  useState,
  useEffect
} from 'react';
import {
  ThemeProvider,
  createMuiTheme
} from '@material-ui/core/styles';
import {
  TextField,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Button,
  Typography,
  InputAdornment,
  IconButton
} from '@material-ui/core';
import red from '@material-ui/core/colors/red';
import yellow from '@material-ui/core/colors/yellow';
import grey from '@material-ui/core/colors/grey';
import {
  VpnKey,
  FilterNone
} from '@material-ui/icons';
import { connect } from 'react-redux';

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

interface Props {
  /**
 * Whether or not this component should be visible to the user
 * @author Michael Andrews
 */
  visible: boolean,
  /**
 * This function defines what should happen if the component is to be closed
 * @author Michael Andrews
 */
  onClose: Function,
  /**
   * This is the prop containing the redux state variable for the logged in user credentials
   */
  redux_authentication: any
}
/**
 * ShareScheduleKeyDialogWindow returns this component
 *
 * @param  props: Props These are the props for ShareScheduleKeyDialogWindow
 * @author Michael Andrews
 */
function ShareScheduleKeyDialogWindow(props: Props) {

  const [scheduleKey, setScheduleKey] = useState<string>('');
  const [showConfirmGenerateKeyDialog, setShowConfirmGenerateKeyDialog] = useState<boolean>(false);

  useEffect(() => getScheduleKey(props.redux_authentication.userId), []);

  /**
 * getScheduleKey requests the users current schedule key
 *
 * @param  userId
 * @author Michael Andrews
 */
  function getScheduleKey(userId: string) {
    try {
      fetch('/getScheduleKey', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId
        }),
      }).then((response) => response.json())
        .then((json) => {
          if (json.length > 0) {
            setScheduleKey(json[0].scheduleKey);
          }
        });
    } catch (err) {
      console.log(err);
    }
  }

  /**
 * generateScheduleKey requests a new key to be generated for the user
 *
 * @param  userId
 * @author Michael Andrews
 */
  function generateScheduleKey(userId: string) {
    try {
      fetch('/generateScheduleKey', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId
        }),
      }).then((response) => getScheduleKey(userId));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Dialog
        open={showConfirmGenerateKeyDialog}
        onClose={() => setShowConfirmGenerateKeyDialog(false)}
      >
        <DialogTitle>Generate New Key</DialogTitle>
        <DialogContent>Are you sure you want to generate a new key? Your schedule will only be viewable with the new key upon generation.</DialogContent>
        <DialogActions>
          <Button
            variant='contained'
            color='primary'
            onClick={() => setShowConfirmGenerateKeyDialog(false)}
          >
            Cancel
      </Button>
          <Button
            variant='contained'
            color='primary'
            onClick={() => {
              generateScheduleKey(props.redux_authentication.userId);
              setShowConfirmGenerateKeyDialog(false);
            }}
          >
            Generate
    </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={props.visible}
        onClose={() => props.onClose()}
        fullWidth={true}
        style={{
          zIndex: 1
        }}
      >
        <DialogTitle>Share Schedule Key</DialogTitle>
        <DialogContent>
          <Typography
            variant='body1'
          >
            Share this key with individuals who wish to view your schedule without having a Cytinerary account.
        </Typography>
          <div
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              marginTop: '20px'
            }}
          >
            <TextField
              style={{ width: '100%' }}
              label="Schedule Key"
              variant='filled'
              value={scheduleKey}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <VpnKey />
                  </InputAdornment>
                )
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            variant='contained'
            color='primary'
            onClick={() => setShowConfirmGenerateKeyDialog(true)}
          >
            Generate New Key
          </Button>
          <Button
            variant='contained'
            color='primary'
            onClick={() => props.onClose()}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );

}

const mapStateToProps = (state: any) => {
  const { authentication } = state;
  return { redux_authentication: authentication };
}

export default connect(mapStateToProps)(ShareScheduleKeyDialogWindow);

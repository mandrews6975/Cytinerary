import React, {
  useState,
  useEffect
} from 'react';
import {
  ThemeProvider,
  createMuiTheme
} from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import yellow from '@material-ui/core/colors/yellow';
import grey from '@material-ui/core/colors/grey';
import {
  TextField,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Button,
  InputAdornment,
  Divider,
  List,
  Popper,
  Paper
} from '@material-ui/core';
import {

} from '@material-ui/icons';
import ShareDialogSharedListItem from '../list_items/ShareDialogSharedListItem';

interface Event {
  eventId: string,
  creator: string,
  name: string,
  description: string,
  location: string,
  startTime: Date,
  endTime: Date,
  label: string
}

interface Props {
  visible: boolean,
  onClose: Function,
  eventId: string
}

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

const sharerId = '111';

function EditEventDialogWindow(props: Props) {

  const [currentlyShared, setCurrentlyShared] = useState<{ userId: string, name: string, email: string }[]>([]);
  const [input, setInput] = useState<string>('');

  // useEffect(() => getSharedUsers(sharerId), []);

  // function getSharedUsers(sharerId: string) {
  //   try {
  //     fetch('/getSharedUsers', {
  //       method: 'POST',
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         sharerId: sharerId
  //       }),
  //     }).then((response) => response.json())
  //       .then((json) => {
  //         let newCurrentlyShared: { userId: string, name: string, email: string }[] = [];
  //         json.forEach((sharee: string[]) => {
  //           newCurrentlyShared.push({
  //             userId: sharee[0],
  //             name: sharee[3] + ' ' + sharee[2],
  //             email: sharee[1] + '@iastate.edu'
  //           });
  //         });
  //         setCurrentlyShared(newCurrentlyShared);
  //       });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  return (
    <Dialog
      open={props.visible}
      onClose={() => props.onClose()}
      fullWidth={true}
      maxWidth='md'
      style={{
        zIndex: 1
      }}
    >
      <ThemeProvider theme={theme}>
        <DialogTitle>Event Details</DialogTitle>
        <DialogContent>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <TextField
              variant='standard'
              label='Title'
              style={{
                width: '30%'
              }}
            />
            <TextField
              variant='standard'
              label='Location'
              style={{
                width: '30%'
              }}
            />
          </div>
          <Divider
            style={{
              marginBottom: '10px',
            }}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start'
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 7,
                marginBottom: '10px',
                marginRight: '10px'
              }}
            >
              <TextField
                variant='filled'
                label='Description'
                style={{
                  width: '100%'
                }}
                multiline
                rows={13}
                rowsMax={13}
              />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 3,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  backgroundColor: 'blue',
                  flex: 1
                }}
              >
                <Button
                  variant='contained'
                  color='primary'
                  onClick={() => { }}
                >
                  Share
              </Button>
              </div>
            </div>
          </div>
          <Divider
            style={{
              marginBottom: '10px',
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant='contained'
            color='primary'
            onClick={() => props.onClose()}
          >
            Cancel
          </Button>
          <Button
            variant='contained'
            color='primary'
            onClick={() => props.onClose()}
          >
            Update
          </Button>
        </DialogActions>
      </ThemeProvider>
    </Dialog>
  );

}

export default EditEventDialogWindow;

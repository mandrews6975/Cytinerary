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
  Divider,
  List,
  IconButton,
  Typography
} from '@material-ui/core';
import {
  Edit
} from '@material-ui/icons';
import ShareDialogListItem from '../list_items/ShareDialogListItem';

var dateFormat = require('dateformat');

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
  const [titleInput, setTitleInput] = useState<string>('');
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [endTime, setEndTime] = useState<Date>(new Date());
  const [locationInput, setLocationInput] = useState<string>('');
  const [descriptionInput, setDescriptionInput] = useState<string>('');

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
            <Button
              variant='outlined'
              color='inherit'
              onClick={() => { }}
            >
              {dateFormat(startTime, 'mm/dd/yy hh:MM TT')}
            </Button>
            <Typography variant='subtitle1'>
              to
            </Typography>
            <Button
              variant='outlined'
              color='inherit'
              onClick={() => { }}
            >
              {dateFormat(endTime, 'mm/dd/yy hh:MM TT')}
            </Button>
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
              marginTop: '10px',
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
                height: window.innerHeight * 0.3075,
                marginRight: '10px'
              }}
            >
              <TextField
                variant='filled'
                label='Description'
                style={{
                  width: '100%',
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
                height: window.innerHeight * 0.3075,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flex: 1,
                  width: '100%'
                }}
              >
                <Typography variant='subtitle1'>
                  Participants
                </Typography>
                <IconButton>
                  <Edit />
                </IconButton>
              </div>
              <div
                style={{
                  overflowY: 'scroll',
                  height: window.innerHeight * 0.25,
                  width: '100%'
                }}
              >
                <List>
                  {currentlyShared.map((
                    person: { userId: string, name: string, email: string },
                    index: number,
                    array: { userId: string, name: string, email: string }[]
                  ) => (
                      <ShareDialogListItem
                        name={person.name}
                        email={person.email}
                        color='red'
                        key={`${person.name}-${person.email}-${index}-shared`}
                      />
                    ))}
                </List>
              </div>
            </div>
          </div>
          <Divider
            style={{
              marginTop: '10px'
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

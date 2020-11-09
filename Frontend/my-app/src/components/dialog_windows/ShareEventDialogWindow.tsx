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
  People
} from '@material-ui/icons';
import ShareDialogSharedListItem from '../list_items/ShareDialogSharedListItem';
import ShareDialogSearchListItem from '../list_items/ShareDialogSearchListItem';

interface Props {
  visible: boolean,
  onClose: Function,
  eventId: string,
  creatorId: string
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

/**
 * ShareEventDialogWindow
 * 
 * @param props
 * @return the component
 * @author Vincent Woodward
 */
function ShareEventDialogWindow(props: Props) {

  const [currentEventParticipants, setCurrentEventParticipants] = useState<{ userId: string, name: string, email: string }[]>([]);
  const [discoveredUsers, setDiscoveredUsers] = useState<{ userId: string, name: string, email: string }[]>([]);
  const [autocompleteAnchor, setAutocompleteAnchor] = useState<HTMLElement | null>(null);
  const [input, setInput] = useState<string>('');

  useEffect(getUsers, []);
  useEffect(() => getEventParticipants(props.eventId), []);

  /**
 * Gets the uesrs for a given event
 * @author Vincent Woodward
 */
  function getUsers() {
    try {
      fetch('/getUsers', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }).then((response) => response.json())
        .then((json) => {
          let newDiscoveredUsers: { userId: string, name: string, email: string }[] = [];
          if (json.length > 0) {
            json.forEach((user: { userId: string, firstName: string, lastName: string, netId: string }) => {
              newDiscoveredUsers.push({
                userId: user.userId,
                name: user.firstName + ' ' + user.lastName,
                email: user.netId + '@iastate.edu'
              });
            });
          }
          setDiscoveredUsers(newDiscoveredUsers);
        });
    } catch (err) {
      console.log(err);
    }
  }

  /**
 * Gets the participants of the event
 * 
 * @param eventId
 * @author Vincent Woodward
 */
  function getEventParticipants(eventId: string) {
    try {
      fetch('/getEventParticipants', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventId: eventId
        }),
      }).then((response) => response.json())
        .then((json) => {
          let newEventParticipants: { userId: string, name: string, email: string }[] = [];
          if (json.length > 0) {
            json.forEach((sharee: string[]) => {
              newEventParticipants.push({
                userId: sharee[0],
                name: sharee[3] + ' ' + sharee[2],
                email: sharee[1] + '@iastate.edu'
              });
            });
          }
          setCurrentEventParticipants(newEventParticipants);
        });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Dialog
      open={props.visible}
      onClose={() => props.onClose()}
      fullWidth={true}
      maxWidth='sm'
      style={{
        zIndex: 1
      }}
    >
      <ThemeProvider theme={theme}>
        <DialogTitle>Share Event</DialogTitle>
        <DialogContent>
          <TextField
            variant='filled'
            label='Add people'
            style={{
              width: '100%'
            }}
            InputProps={{
              startAdornment: <InputAdornment
                position='start'
              >
                <People />
              </InputAdornment>
            }}
            onChange={(event) => {
              setAutocompleteAnchor(event.currentTarget);
              setInput(event.target.value);
            }}
            key='input'
          />
          <Popper
            open={input !== ''}
            anchorEl={autocompleteAnchor}
            placement='bottom-start'
            style={{
              zIndex: 2
            }}
          >
            <Paper>
              <List>
                {discoveredUsers.map((
                  user: { name: string, email: string, userId: string },
                  index: number,
                  array: { name: string, email: string, userId: string }[]
                ) => (
                    ((user.name.toUpperCase().includes(input.toUpperCase()) || user.email.toUpperCase().includes(input.toUpperCase())) && user.userId !== props.creatorId && !currentEventParticipants.some((sharedUser) => sharedUser.userId === user.userId)) && <ShareDialogSearchListItem
                      name={user.name}
                      email={user.email}
                      color='red'
                      onClick={() => {
                        try {
                          fetch('/addParticipant', {
                            method: 'POST',
                            headers: {
                              Accept: 'application/json',
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                              eventId: props.eventId,
                              participant: user.userId
                            }),
                          }).then(() => getEventParticipants(props.eventId));
                        } catch (err) {
                          console.log(err);
                        }
                        getEventParticipants(props.eventId);
                        setInput('');
                      }}
                      key={`${user.name}-${user.email}-${index}-search`}
                    />
                  ))}
              </List>
            </Paper>
          </Popper>
          <Divider
            style={{
              marginTop: '10px',
            }}
          />
          <div
            style={{
              overflowY: 'scroll',
              height: window.innerHeight * 0.26,
              flex: 1
            }}
          >
            <List>
              {currentEventParticipants.map((
                person: { userId: string, name: string, email: string },
                index: number,
                array: { userId: string, name: string, email: string }[]
              ) => (
                  <ShareDialogSharedListItem
                    name={person.name}
                    email={person.email}
                    color='red'
                    onRemove={() => {
                      try {
                        fetch('/removeParticipant', {
                          method: 'POST',
                          headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({
                            eventId: props.eventId,
                            participant: person.userId
                          }),
                        }).then(() => getEventParticipants(props.eventId));
                      } catch (err) {
                        console.log(err);
                      }
                    }}
                    key={`${person.name}-${person.email}-${index}-shared`}
                  />
                ))}
            </List>
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
            Done
          </Button>
        </DialogActions>
      </ThemeProvider>
    </Dialog>
  );

}

export default ShareEventDialogWindow;

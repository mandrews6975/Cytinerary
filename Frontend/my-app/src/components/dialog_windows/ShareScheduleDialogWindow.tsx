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
  /**
 * Flag indicating whether or not this component should be visible to the user.
 * @author Vincent Woodward
 */
  visible: boolean,
  /**
 * Function defining what should be done when the component closes
 * @author Vincent Woodward
 */
  onClose: Function,
  /**
 * userId
 * @author Vincent Woodward
 */
  userId: string
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
 * ShareScheduleDialogWindow
 * 
 * @param props
 * @return this component
 * @author Vincent Woodward
 */
function ShareScheduleDialogWindow(props: Props) {

  const [currentlyShared, setCurrentlyShared] = useState<{ userId: string, name: string, email: string }[]>([]);
  const [discoveredUsers, setDiscoveredUsers] = useState<{ userId: string, name: string, email: string }[]>([]);
  const [autocompleteAnchor, setAutocompleteAnchor] = useState<HTMLElement | null>(null);
  const [input, setInput] = useState<string>('');
  const sharerId = props.userId;

  useEffect(getUsers, []);
  useEffect(() => getSharedUsers(sharerId), []);

  /**
 * Gets the users for a particular event
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
          json.forEach((user: { userId: string, firstName: string, lastName: string, netId: string }) => {
            newDiscoveredUsers.push({
              userId: user.userId,
              name: user.firstName + ' ' + user.lastName,
              email: user.netId + '@iastate.edu'
            });
          });
          setDiscoveredUsers(newDiscoveredUsers);
        });
    } catch (err) {
      console.log(err);
    }
  }

  /**
 * Gets the shared users for an event
 * 
 * @param sharerId 
 * @author Vincent Woodward
 */
  function getSharedUsers(sharerId: string) {
    try {
      fetch('/getSharedUsers', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sharerId: sharerId
        }),
      }).then((response) => response.json())
        .then((json) => {
          let newCurrentlyShared: { userId: string, name: string, email: string }[] = [];
          json.forEach((sharee: string[]) => {
            newCurrentlyShared.push({
              userId: sharee[0],
              name: sharee[3] + ' ' + sharee[2],
              email: sharee[1] + '@iastate.edu'
            });
          });
          setCurrentlyShared(newCurrentlyShared);
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
        <DialogTitle>Share Schedule</DialogTitle>
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
                    ((user.name.toUpperCase().includes(input.toUpperCase()) || user.email.toUpperCase().includes(input.toUpperCase())) && user.userId !== sharerId && !currentlyShared.some((sharedUser) => sharedUser.userId === user.userId)) && <ShareDialogSearchListItem
                      name={user.name}
                      email={user.email}
                      color='red'
                      onClick={() => {
                        try {
                          fetch('/addSharedUser', {
                            method: 'POST',
                            headers: {
                              Accept: 'application/json',
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                              sharerId: sharerId,
                              shareeId: user.userId
                            }),
                          }).then(() => getSharedUsers(sharerId));
                        } catch (err) {
                          console.log(err);
                        }
                        getSharedUsers(sharerId);
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
              {currentlyShared.map((
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
                        fetch('/deleteSharedUser', {
                          method: 'POST',
                          headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({
                            sharerId: sharerId,
                            shareeId: person.userId
                          }),
                        }).then(() => getSharedUsers(sharerId));
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

export default ShareScheduleDialogWindow;

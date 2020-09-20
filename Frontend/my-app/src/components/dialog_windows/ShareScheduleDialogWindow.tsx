import React, {
  useState
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
  onClose: Function
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

const sharerId = '1';

function ShareScheduleDialogWindow(props: Props) {

  const [currentlyShared, setCurrentlyShared] = useState<{userId: string, name: string, email: string}[]>([]);
  const [autocompleteAnchor, setAutocompleteAnchor] = useState<HTMLElement | null>(null);
  const [input, setInput] = useState<string>('');

  function getSharedUsers(sharerId: string) {
    try{
      fetch('http://localhost:8080/getSharedUsers', {
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
        let newCurrentlyShared: {userId: string, name: string, email: string}[] = [];
        json.forEach((sharee: {userId: string, FirstName: string, LastName: string, netId: string}) => {
          newCurrentlyShared.push({
            userId: sharee.userId,
            name: sharee.FirstName + ' ' + sharee.LastName,
            email: sharee.netId + '@iastate.edu'
          });
        });
        setCurrentlyShared(newCurrentlyShared);
      });
    }catch(err){
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
            open={input != ''}
            anchorEl={autocompleteAnchor}
            placement='bottom-start'
            style={{
              zIndex: 2
            }}
          >
            <Paper>
              <List>
                {people.map((
                  person: { name: string, email: string},
                  index: number,
                  array: { name: string, email: string}[]
                ) => (
                    (person.name.toUpperCase().includes(input.toUpperCase()) || person.email.toUpperCase().includes(input.toUpperCase())) && <ShareDialogSearchListItem
                      name={person.name}
                      email={person.email}
                      color='red'
                      onClick={() => {
                        let newCurrentlyShared = [...currentlyShared];
                        newCurrentlyShared.push({
                          name: person.name,
                          email: person.email,
                          color: 'red'
                        })
                        setCurrentlyShared(newCurrentlyShared);
                        setInput('');
                      }}
                      key={`${person.name}-${person.email}-${index}-search`}
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
                person: {userId: string, name: string, email: string},
                index: number,
                array: {userId: string, name: string, email: string}[]
              ) => (
                  <ShareDialogSharedListItem
                    name={person.name}
                    email={person.email}
                    color='red'
                    onRemove={() => {
                      try{
                        fetch('http://localhost:8080/deleteSharedUser', {
                          method: 'POST',
                            headers: {
                              Accept: 'application/json',
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                              sharerId: sharerId,
                              shareeId: person.userId
                            }),
                        }).then((response) => response.json())
                        .then((json) => {
                          getSharedUsers(sharerId);
                        });
                      }catch(err){
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

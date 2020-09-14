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

const people = [
  { name: 'Michael Andrews', email: 'maa3@iastate.edu', color: '#1e88e5' },
  { name: 'Peter Rothstein', email: 'proth@iastate.edu', color: '#ff5722' },
  { name: 'Lewis Sheaffer', email: 'lewiss@iastate.edu', color: '#00897b' },
  { name: 'Vincent Woodward', email: 'wood10@iastate.edu', color: '#512da8' }
]

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

function ShareScheduleDialogWindow(props: Props) {

  const [currentlyShared, setCurrentlyShared] = useState<{ name: string, email: string, color: string }[]>([]);
  const [autocompleteAnchor, setAutocompleteAnchor] = useState<HTMLElement | null>(null);
  const [input, setInput] = useState<string>('');

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
                  person: { name: string, email: string, color: string },
                  index: number,
                  array: { name: string, email: string, color: string }[]
                ) => (
                    (person.name.toUpperCase().includes(input.toUpperCase()) || person.email.toUpperCase().includes(input.toUpperCase())) && <ShareDialogSearchListItem
                      name={person.name}
                      email={person.email}
                      color={person.color}
                      onClick={() => {
                        let newCurrentlyShared = [...currentlyShared];
                        newCurrentlyShared.push({
                          name: person.name,
                          email: person.email,
                          color: person.color
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
                person: { name: string, email: string, color: string },
                index: number,
                array: { name: string, email: string, color: string }[]
              ) => (
                  <ShareDialogSharedListItem
                    name={person.name}
                    email={person.email}
                    color={person.color}
                    onRemove={() => {
                      let newCurrentlyShared = [...currentlyShared];
                      newCurrentlyShared.splice(index, 1);
                      setCurrentlyShared(newCurrentlyShared);
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

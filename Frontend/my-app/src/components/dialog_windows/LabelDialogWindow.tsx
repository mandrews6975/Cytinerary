import React, {
  useState,
  useEffect
} from 'react';
import {
  ThemeProvider,
  createMuiTheme
} from '@material-ui/core/styles';
import ColorPicker from 'material-ui-color-picker'
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
  Popper
} from '@material-ui/core';

import LabelDialogListItem from '../list_items/LabelDialogListItem';

interface IProps {
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

const userId = 'proth';

function LabelDialogWindow(props: IProps) {

  const [allLabels, setAllLabels]= useState<{ userId: string, label: string, color: string }[]>([]);

  const [labelInput, setLabelInput] = useState<string>('');

  const [colorChoice, setColorChoice]= useState<string>('');

  useEffect(() => getLabels(userId), []);

  function getLabels(userId: string) {
    try {
      fetch('/getLabels', {
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
          let instanceLabel: { userId: string, label: string, color: string }[] = [];
          json.forEach((label: { userId: string, label: string, color: string} ) => {
            instanceLabel.push({
              userId: label.userId,
              label: label.label,
              color: label.color
            });
          });
          setAllLabels(instanceLabel);
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
        <DialogTitle>Labels</DialogTitle>
        <DialogContent>
          <TextField
            variant='filled'
            label='Add label'
            style={{
              width: '50%'
            }}
            value={labelInput}
            onChange={(event) => {
              setLabelInput(event.target.value);
            }}
            key='input'
          />
          <ColorPicker
            name='color'
            defaultValue='#000000'
            value = {colorChoice}
            onChange={color => setColorChoice(color)}
          />
          <Button
            onClick={() => {
              try {
                fetch('/addLabel', {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    userId: userId,
                    label: labelInput,
                    color: colorChoice
                  }),
                }).then(() => getLabels(userId));
              } catch (err) {
                console.log(err);
              }
              getLabels(userId);
              setLabelInput('');
            }}
            >
            Add
          </Button>
          <Popper
            open={labelInput !== ''}
            placement='bottom-start'
            style={{
              zIndex: 2
            }}
          >
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
              {allLabels.map((
                person: { userId: string, label: string, color: string }
              ) => (
                  <LabelDialogListItem
                    label={person.label}
                    color={person.color}
                    onRemove={() => {
                      try {
                        fetch('/deleteLabel', {
                          method: 'POST',
                          headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({
                            userId: person.userId,
                            label: person.label
                          }),
                        }).then(() => getLabels(person.userId));
                      } catch (err) {
                        console.log(err);
                      }
                    }}
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

export default LabelDialogWindow;

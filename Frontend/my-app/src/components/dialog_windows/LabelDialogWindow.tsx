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
  Fab
} from '@material-ui/core';

import LabelDialogListItem from '../list_items/LabelDialogListItem';

interface IProps {
  /**
 * Indicates whether or not this component should be visible to the user
 * @author Vincent Woodward
 */
  visible: boolean,
  /**
 * This function defines what should happen when the component is closed
 * @author Vincent Woodward
 */
  onClose: Function,
  /**
 * This is the string that represents a userId
 * @author Vincent Woodward
 */
  userId: string,
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
 * LabelDialogWindow returns this component
 *
 * @param props
 * @return this component
 * @author Vincent Woodward
 */
function LabelDialogWindow(props: IProps) {

  const concrete_userId = props.userId;

  const [allLabels, setAllLabels]= useState<{ userId: string, label: string, color: string }[]>([]);

  const [labelInput, setLabelInput] = useState<string>('');

  const [colorChoice, setColorChoice]= useState<string>('');

  const [colorPicker, setColorPicker] = useState(false);

  useEffect(() => getLabels(concrete_userId), []);

/**
 * getLabels grabs the label from the backend
 *
 * @param userId
 * @author Vincent Woodward
 */
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
          <Dialog open={colorPicker} onClose={() => setColorPicker(false)}>
            <DialogTitle>Choose Color</DialogTitle>
            <DialogContent>
              {/* Red */}
              <Fab
                style={{
                backgroundColor: '#d32f2f'
                }}
                name='color'
                value={colorChoice}
                onClick={() => {setColorChoice('d32f2f'); setColorPicker(false)}}
              >
              </Fab>
              {/* Blue */}
              <Fab
                style={{
                backgroundColor: '#1976d2'
                }}
                name='color'
                value={colorChoice}
                onClick={() => {setColorChoice('1976d2'); setColorPicker(false)}}
              >
              </Fab>
              {/* Green */}
              <Fab
                style={{
                backgroundColor: '#388e3c'
                }}
                name='color'
                value={colorChoice}
                onClick={() => {setColorChoice('388e3c'); setColorPicker(false)}}
              >
              </Fab>
              {/* Orange */}
              <Fab
                style={{
                backgroundColor: '#e64a19'
                }}
                name='color'
                value={colorChoice}
                onClick={() => {setColorChoice('e64a19'); setColorPicker(false)}}
              >
              </Fab>
              {/* Purple */}
              <Fab
                style={{
                backgroundColor: '#512da8'
                }}
                name='color'
                value={colorChoice}
                onClick={() => {setColorChoice('512da8'); setColorPicker(false)}}
              >
              </Fab>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setColorPicker(false)}>
                Back
              </Button>
            </DialogActions>
          </Dialog>
          <Button variant="outlined"
            style={{
              marginLeft: '30px',
              position: 'fixed',
              color: '#' + colorChoice
            }}
            onClick={() => setColorPicker(true)}>
            Color
          </Button>
          <Button variant="outlined"
            style={{
              marginLeft: '190px',
              position: 'fixed'
            }}
            onClick={() => {
              if(labelInput == '')
              {
                alert("Cannot have empty label")
              }
              else if(labelInput.length >=15)
              {
                alert("Character limit of 15 or greater was reached")
              }
              else
              {
                try {
                  fetch('/addLabel', {
                    method: 'POST',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      userId: concrete_userId,
                      label: labelInput,
                      color: colorChoice
                    }),
                  }).then(() => getLabels(concrete_userId));
                } catch (err) {
                  console.log(err);
                }
                getLabels(concrete_userId);
                setLabelInput('');
              }}
            }
            >
            Add
          </Button>
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

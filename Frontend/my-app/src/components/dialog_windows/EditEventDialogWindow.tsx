import React, {
  useState,
  useEffect
} from 'react';
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
import DateFnsUtils from '@date-io/date-fns';
import {
  DateTimePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import ShareDialogListItem from '../list_items/ShareDialogListItem';
import ShareEventDialogWindow from './ShareEventDialogWindow';

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
  onUpdate: Function,
  eventId: string,
  creatorId: string,
  update: boolean
}

function EditEventDialogWindow(props: Props) {

  const [originalEvent, setOriginalEvent] = useState<Event>({
    eventId: props.eventId,
    creator: props.creatorId,
    name: '',
    description: '',
    location: '',
    startTime: new Date(),
    endTime: new Date(),
    label: ''
  });
  const [currentEventParticipants, setCurrentEventParticipants] = useState<{ userId: string, name: string, email: string }[]>([]);
  const [titleInput, setTitleInput] = useState<string>('');
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [endTime, setEndTime] = useState<Date>(new Date());
  const [locationInput, setLocationInput] = useState<string>('');
  const [descriptionInput, setDescriptionInput] = useState<string>('');
  const [showShareEventDialogWindow, setShowShareEventDialogWindow] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);

  useEffect(() => getEvent(props.creatorId, props.eventId), []);
  useEffect(() => getEventParticipants(props.eventId), []);
  useEffect(() => setUpdate(props.update), []);

  function getEvent(creatorId: string, eventId: string) {
    if (eventId !== '') {
      try {
        fetch('/getEvent', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            creatorId: creatorId,
            eventId: eventId
          }),
        }).then((response) => response.json())
          .then((json) => {
            setTitleInput(json[0].name);
            setStartTime(json[0].startTime);
            setEndTime(json[0].endTime);
            setLocationInput(json[0].location);
            setDescriptionInput(json[0].description);
            setOriginalEvent({
              eventId: props.eventId,
              creator: creatorId,
              name: json[0].name,
              description: json[0].description,
              location: json[0].location,
              startTime: json[0].startTime,
              endTime: json[0].endTime,
              label: ''
            })
          });
      } catch (err) {
        console.log(err);
      }
    }
  }

  function updateEvent(creatorId: string, eventId: string) {
    if (eventId !== '') {
      try {
        fetch('/updateEvent', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            eventId: eventId,
            creator: creatorId,
            name: titleInput,
            description: descriptionInput,
            startTime: dateFormat(startTime, 'yyyy-mm-dd HH:MM:ss'),
            endTime: dateFormat(endTime, 'yyyy-mm-dd HH:MM:ss'),
            location: locationInput,
            label: ''
          }),
        }).then(() => getEvent(props.creatorId, props.eventId));
      } catch (err) {
        console.log(err);
      }
    }
  }

  function getEventParticipants(eventId: string) {
    if (eventId !== '') {
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
  }

  if (props.eventId !== originalEvent.eventId) {
    getEvent(props.creatorId, props.eventId);
    getEventParticipants(props.eventId);
  } else if (props.update !== update) {
    getEvent(props.creatorId, props.eventId);
    getEventParticipants(props.eventId);
    setUpdate(props.update);
  }

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
      <ShareEventDialogWindow
        visible={showShareEventDialogWindow}
        onClose={() => {
          setShowShareEventDialogWindow(false);
          getEventParticipants(props.eventId);
        }}
        eventId={props.eventId}
        creatorId={props.creatorId}
      />
      <DialogTitle> Event Details</DialogTitle>
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
            value={titleInput || ''}
            onChange={((event) => {
              setTitleInput(event.target.value);
            })}
            key='titleInput'
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
              label='Start'
              value={startTime}
              onChange={(date: MaterialUiPickersDate) => {
                if (date !== null) {
                  setStartTime(date);
                }
              }}
            />
            <DateTimePicker
              label='End'
              value={endTime}
              minDate={startTime}
              minDateMessage=''
              maxDate={startTime}
              maxDateMessage=''
              onChange={(date: MaterialUiPickersDate) => {
                if (date !== null) {
                  setEndTime(date);
                }
              }}
            />
          </MuiPickersUtilsProvider>
          <TextField
            variant='standard'
            label='Location'
            style={{
              width: '30%'
            }}
            value={locationInput || ''}
            onChange={((event) => {
              setLocationInput(event.target.value);
            })}
            key='locationInput'
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
              value={descriptionInput || ''}
              onChange={((event) => {
                setDescriptionInput(event.target.value);
              })}
              key='descriptionInput'
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
              <IconButton
                onClick={() => setShowShareEventDialogWindow(true)}
              >
                <Edit />
              </IconButton>
            </div>
            <div
              style={{
                overflowY: 'scroll',
                minHeight: '231px',
                maxHeight: window.innerHeight >= 926 ? window.innerHeight * 0.25 : '231px',
                width: '100%'
              }}
            >
              <List>
                {currentEventParticipants.map((
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
        {new Date(startTime).getTime() >= new Date(endTime).getTime() && (
          <Typography
            variant='subtitle1'
            color='error'
          >
            End time must be after start time.
            </Typography>
        )}
        <Button
          variant='contained'
          color='primary'
          onClick={() => props.onClose()}
        >
          {
            ((
              originalEvent.name !== titleInput ||
              originalEvent.startTime !== startTime ||
              originalEvent.endTime !== endTime ||
              originalEvent.location !== locationInput ||
              originalEvent.description !== descriptionInput
            ) ? 'Cancel' : 'Close')
          }
        </Button>
        <Button
          variant='contained'
          color='primary'
          onClick={() => {
            updateEvent(props.creatorId, props.eventId);
            props.onUpdate();
          }}
          disabled={
            (originalEvent.name === titleInput &&
              originalEvent.startTime === startTime &&
              originalEvent.endTime === endTime &&
              originalEvent.location === locationInput &&
              originalEvent.description === descriptionInput) ||
            new Date(startTime).getTime() >= new Date(endTime).getTime()
          }
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );

}

export default EditEventDialogWindow;

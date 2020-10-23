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
  onUpdate: Function,
  eventId: string,
  creatorId: string
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
  const [currentlyShared, setCurrentlyShared] = useState<{ userId: string, name: string, email: string }[]>([]);
  const [titleInput, setTitleInput] = useState<string>('');
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [endTime, setEndTime] = useState<Date>(new Date());
  const [locationInput, setLocationInput] = useState<string>('');
  const [descriptionInput, setDescriptionInput] = useState<string>('');

  useEffect(() => getEvent(props.creatorId, props.eventId));
  useEffect(() => getParticipants(props.eventId));

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
            startTime: startTime,
            endTime: endTime,
            location: locationInput,
            label: ''
          }),
        }).then(() => getEvent(props.creatorId, props.eventId));
      } catch (err) {
        console.log(err);
      }
    }
  }

  function getParticipants(eventId: string) {
    if (eventId !== '') {
      try {
        fetch('/getParticipantsSecure', {
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
            value={titleInput || ''}
            onChange={((event) => {
              setTitleInput(event.target.value);
            })}
            key='titleInput'
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
          onClick={() => {
            updateEvent(props.creatorId, props.eventId);
            props.onUpdate();
          }}
          disabled={!(
            originalEvent.name !== titleInput ||
            originalEvent.startTime !== startTime ||
            originalEvent.endTime !== endTime ||
            originalEvent.location !== locationInput ||
            originalEvent.description !== descriptionInput
          )}
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );

}

export default EditEventDialogWindow;

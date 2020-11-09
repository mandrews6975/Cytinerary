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
/**
 * This is the eventId
 * @author Vincent Woodward
 */
  eventId: string,
  /**
 * This is the id for the creator for a given event
 * @author Vincent Woodward
 */
  creator: string,
  /**
 *  Name of the event
 * @author Vincent Woodward
 */
  name: string,
  /**
 * Description of an event
 * @author Vincent Woodward
 */
  description: string,
  /**
 * Location that the event will take place
 * @author Vincent Woodward
 */
  location: string,
  /**
 * This represents the starting time and date for an event
 * @author Vincent Woodward
 */
  startTime: Date,
  /**
 * This represents the ending time and date for an event.
 * @author Vincent Woodward
 */
  endTime: Date,
  /**
 * This is the label
 * @author Vincent Woodward
 */
  label: string
}

interface Props {
  /**
 * Whether or not this component should be visible to the user
 * @author Vincent Woodward
 */
  visible: boolean,
  /**
 * This function defines what should happen if the component is to be closed
 * @author Vincent Woodward
 */
  onClose: Function,
  /**
 * This function updates everything that needs to be updated that's related to an event
 * @author Vincent Woodward
 */
  onUpdate: Function,
  /**
 * This function deletes everything that needs to be deleted that's related to an event.
 * @author Vincent Woodward
 */
  onDelete: Function,
  /**
 * This is the eventId for a given event
 * @author Vincent Woodward
 */
  eventId: string,
  /**
 * This is the creatorId for a given event
 * @author Vincent Woodward
 */
  creatorId: string,
  /**
 * This boolean is a flag to indicate whether or not an event needs to be updated
 * @author Vincent Woodward
 */
  update: boolean,
}
/**
 * EditEventDialogWindow returns this component
 *
 * @param  props: Props These are the props for EditEventDialogWindow
 * @author Vincent Woodward
 */
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
  const [labelInput, setLabelInput] = useState<string>('');
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [endTime, setEndTime] = useState<Date>(new Date());
  const [locationInput, setLocationInput] = useState<string>('');
  const [descriptionInput, setDescriptionInput] = useState<string>('');
  const [showShareEventDialogWindow, setShowShareEventDialogWindow] = useState<boolean>(false);
  const [showDeleteEventDialog, setShowDeleteEventDialog] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);

  const [labelColor, setLabelColor] = useState<string>('');

  /**
 *  getEvent grabs an event using an eventId and creatorId
 *
 * @param  creatorId
 * @param eventId
 * @author Vincent Woodward
 */
  function getEvent(creatorId: string, eventId: string) {
    if (eventId !== '' && props.visible) {
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
            if(json.length > 0){
            setTitleInput(json[0].name);
            setLabelInput(json[0].label);
            getLabelColor(json[0].label)
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
              label: json[0].label
            })
          }
          });
      } catch (err) {
        console.log(err);
      }
    }
  }

  /**
 * updateEvent updates a given event so that the changes are reflected in the backend.
 *
 * @param  creatorId
 * @param eventId
 * @author Vincent Woodward
 */
  function updateEvent(creatorId: string, eventId: string) {
    if (eventId !== '' && props.visible) {
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
            label: labelInput
          }),
        }).then(() => {
          getEvent(props.creatorId, props.eventId)
          props.onUpdate();
        });
      } catch (err) {
        console.log(err);
      }
    }
  }

    /**
 * deleteEvent gets rid of an event from a schedule
 *
 * @param  creatorId
 * @param eventId
 * @author Vincent Woodward
 */
  function deleteEvent(creatorId: string, eventId: string) {
    if (eventId !== '') {
      try {
        fetch('/deleteEvent', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            eventId: eventId,
            creator: creatorId
          }),
        }).then(() => {
          props.onDelete();
        });
      } catch (err) {
        console.log(err);
      }
    }
  }

  function getLabelColor(label: string)
  {
    try {
      fetch('/getLabelColor', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          label: label
        }),
      }).then((response) => response.json())
        .then((json) => {
          let color: string;
          json.forEach((label: { label: string, color: string} ) => {
            color = label.color
            setLabelColor(color);
          });
        });
    } catch (err) {
      console.log(err);
    }

  }
    /**
 * getEventParticipants grabs the event participants for a given event
 *
 * @param eventId
 * @author Vincent Woodward
 */
  function getEventParticipants(eventId: string) {
    if (eventId !== '' && props.visible) {
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
      <Dialog
        open={showDeleteEventDialog}
        onClose={() => setShowDeleteEventDialog(false)}
      >
        <DialogTitle>Delete Event</DialogTitle>
        <DialogContent>Are you sure you want to delete this event?</DialogContent>
        <DialogActions>
          <Button
            variant='contained'
            color='primary'
            onClick={() => setShowDeleteEventDialog(false)}
          >
            Cancel
        </Button>
          <Button
            variant='contained'
            color='primary'
            onClick={() => {
              deleteEvent(props.creatorId, props.eventId);
              setShowDeleteEventDialog(false);
            }}
          >
            Delete Event
      </Button>
        </DialogActions>
      </Dialog>
      <DialogTitle>Event Details</DialogTitle>
      <text
        style={{
          position: 'fixed',
          marginTop: '25px',
          marginLeft: '700px',
        }}
      >
        Label:
      </text>
      <text
        style={{
          position: 'fixed',
          marginTop: '25px',
          marginLeft: '750px',
          color: '#' + labelColor
        }}
      >
        {labelInput || ''}
      </text>
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
              width: '20%'
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
              style={{
                width: '30%'
              }}
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
              style={{
                width: '30%'
              }}
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
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            flex: 3,
          }}
        >
          <div>
            <Button
              variant='contained'
              color='primary'
              onClick={() => setShowDeleteEventDialog(true)}
            >
              Delete Event
          </Button>
          </div>
          <div>
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
                  originalEvent.label !== labelInput ||
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
              onClick={() => updateEvent(props.creatorId, props.eventId)}
              disabled={
                (originalEvent.name === titleInput &&
                  originalEvent.label !== labelInput &&
                  originalEvent.startTime === startTime &&
                  originalEvent.endTime === endTime &&
                  originalEvent.location === locationInput &&
                  originalEvent.description === descriptionInput) ||
                new Date(startTime).getTime() >= new Date(endTime).getTime()
              }
            >
              Update
          </Button>
          </div>
        </div>
      </DialogActions>
    </Dialog>
  );

}

export default EditEventDialogWindow;

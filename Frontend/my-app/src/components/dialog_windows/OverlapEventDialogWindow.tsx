import React, {
  useState,
  useEffect
} from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Button,
} from '@material-ui/core';

var dateFormat = require('dateformat');

interface Event {
/**
 * This is the eventId
 */
  eventId: string,
  /**
 * This is the id for the creator for a given event
 *
 */
  creator: string,
  /**
 *  Name of the event
 *
 */
  name: string,
  /**
 * Description of an event
 *
 */
  description: string,
  /**
 * Location that the event will take place
 *
 */
  location: string,
  /**
 * This represents the starting time and date for an event
 *
 */
  startTime: Date,
  /**
 * This represents the ending time and date for an event.
 *
 */
  endTime: Date,
  /**
 * This is the label
 *
 */
  label: string
}

interface Props {

  visible: boolean,

  onClose: Function,

  onUpdate: Function,

  onDelete: Function,

  eventId: string,

  creatorId: string,

  update: boolean,
}
/**
 * EditEventDialogWindow returns this component
 *
 * @param  props: Props These are the props for EditEventDialogWindow
 *
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
 *
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
 * getEventParticipants grabs the event participants for a given event
 *
 * @param eventId
 *
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
   <p>sdf</p>
  );

}

export default EditEventDialogWindow;

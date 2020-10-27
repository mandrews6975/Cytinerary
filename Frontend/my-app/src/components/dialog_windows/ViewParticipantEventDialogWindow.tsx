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
    creatorId: string,
    eventId: string
  }

  function ViewParticipantEventDialogWindow(props: Props) {  
    const [event, setEvent] = useState<Event>({
        eventId: props.eventId,
        creator: props.creatorId,
        name: '',
        description: '',
        location: '',
        startTime: new Date(),
        endTime: new Date(),
        label: ''
      });

      function getEvent(creatorId: string, eventId: string){
        if(eventId !== ''){
            try{
                fetch('/getEvent',{
                    method: 'POST',
                    headers: {
                        Accept: 'application/json', 'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        creatorId: creatorId,
                        eventId: eventId
                    }),
                }).then((response)=> response.json()).then((json)=>{
                    setEvent({
                        eventId: props.eventId,
                        creator: props.creatorId,
                        name: json[0].name,
                        description: json[0].description,
                        location: json[0].location,
                        startTime: json[0].startTime,
                        endTime: json[0].endTime,
                        label: ''
                    });
                    console.log(json);
                })
            }
            catch(e){
                console.log(e);
            }

            console.log('yes');
        }
      }

      function handleLeaveButton(){

      }

      getEvent(props.creatorId, props.eventId);

    return (
        <Dialog open={props.visible} onClose={()=> props.onClose()} fullWidth={true} maxWidth='md'>
            <DialogTitle>{event.name}</DialogTitle>
            <DialogTitle>Location</DialogTitle>
            <DialogContent></DialogContent>
            <DialogTitle>Start Time</DialogTitle>
            <DialogContent></DialogContent>
            <DialogTitle>End Time</DialogTitle>
            <DialogContent></DialogContent>
            <DialogTitle>Event Description</DialogTitle>
            <DialogContent></DialogContent>
            <Button color="primary" variant="contained" onClick={()=>{handleLeaveButton()}}>Leave</Button>
        </Dialog>
    );
  }
  
  export default ViewParticipantEventDialogWindow;
  
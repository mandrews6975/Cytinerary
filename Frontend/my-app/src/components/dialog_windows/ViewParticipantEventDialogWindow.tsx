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

    const[eventId, setEventId] = useState<string>(props.eventId);
    const[creatorId, setCreatorId] = useState<string>(props.creatorId);
    const[name, setName] = useState<string>('');
    const[desc, setDesc] = useState<string>('');
    const[location, setLocation] = useState<string>('');
    const[startTime, setStartTime] = useState<string>('');
    const[endTime, setEndTime] = useState<string>('');
    const[label, setLabel] = useState<string>('');
    const[closeWindow, setCloseWindow] = useState<boolean>(false);

      function getEvent(eventId: string){
        if(props.visible)
        {
          if(eventId !== ''){
              try{
                  fetch('/getEventWithId',{
                      method: 'POST',
                      headers: {
                          Accept: 'application/json', 'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                          eventId: eventId
                      }),
                  }).then((response)=> response.json()).then((json)=>{
                    if(json.length > 0){
                      setEventId(eventId);
                      setCreatorId(creatorId);
                      setName(json[0].name);
                      setDesc(json[0].description);
                      setLocation(json[0].location);
                      setStartTime(json[0].startTime);
                      setEndTime(json[0].endTime);
                      setLabel('');
                    }  
                  })
              }
              catch(e){
                  console.log(e);
              }
          }
        }
      }

      function handleLeaveButton(){
        if(eventId !== ''){
          try{
              fetch('/deleteParticipantFromEvent',{
                  method: 'POST',
                  headers: {
                      Accept: 'application/json', 'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                      eventId: eventId,
                      participant: '111'
                  }),
              }).then((response)=> response.text()).then((text)=>{
                if(text.length > 0){
                  setCloseWindow(true);
                }  
              })
          }
          catch(e){
              console.log(e);
          }
        }
      }

      if (props.eventId !== eventId) {
        getEvent(props.eventId);
        setEventId(props.eventId);
      } 

    return (
        <Dialog open={props.visible && !closeWindow} onClose={()=> props.onClose()} fullWidth={true} maxWidth='sm'>
            <DialogTitle style={{backgroundColor: '#F1BE48', color:'black'}}>{name}</DialogTitle>
            <DialogContent style={{}}>
              <div style={{float: 'left'}}>
                <h3>Creator</h3>
                <p>{creatorId}</p>
                <h3>Location:</h3>
                <p>{location}</p>
                <h3>Start Time:</h3>
                <p>{startTime}</p>
                <h3>End Time:</h3>
                <p>{endTime}</p>
              </div>

              <div style={{float: 'right', marginRight: '19%'}}>
                <h3>Description:</h3>
                <p>{desc}</p>
              </div>
            </DialogContent>
            <Divider></Divider>
            <Button color="primary" variant="contained" onClick={()=>{handleLeaveButton()}}>Leave</Button>
        </Dialog>
    );
  }
  
  export default ViewParticipantEventDialogWindow;
  
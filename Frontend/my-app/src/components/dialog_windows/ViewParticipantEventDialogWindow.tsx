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
/**
 * Id for an event
 * @author Vincent Woodward
 */
    eventId: string,
/**
 * A string representing the creator of a given event
 * @author Vincent Woodward
 */
    creator: string,
  /**
 * Name of an event
 * @author Vincent Woodward
 */
    name: string,
/**
 * Description of an event
 * @author Vincent Woodward
 */
    description: string,
/**
 * Location of an event
 * @author Vincent Woodward
 */
    location: string,
/**
 * The time and date of when an event should start
 * @author Vincent Woodward
 */
    startTime: Date,
/**
 * The time and date of when an event should end
 * @author Vincent Woodward
 */
    endTime: Date,
/**
 * Label for an event
 * @author Vincent Woodward
 */
    label: string
  }

  interface Props {
    visible: boolean,
    onClose: Function,
    creatorId: string,
    eventId: string
  }

/**
 * ViewParticipantEventDialogWindow
 * 
 * @param props
 * @return this component
 * @author Vincent Woodward
 */
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

/**
 * Gets an event with an eventId
 * 
 * @param eventId
 * @author Vincent Woodward
 */
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

/**
 * Handles the leave button if a participant would like to leave a event
 * @author Vincent Woodward
 */
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
  
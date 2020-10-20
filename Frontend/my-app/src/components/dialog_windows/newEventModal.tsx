import * as React from 'react'
import { Dialog, DialogTitle, DialogContent, Button, TextField, NativeSelect } from '@material-ui/core/';
import EventParticipantDialogWindow from './EventParticipantDialogWindow'
import { v4 as uuidv4 } from 'uuid';
import { KeyboardDatePicker, KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

interface IProps {
  //onSubmit: string,
  visible: boolean,
  onClose: () => void,
  user: string,
  onSuccessfulSubmit: Function,
}
interface IState {
  name: string,
  description: string,
  label: string,
  fromDate: string,
  toDate: string,
  emptyFieldMessageVisible: boolean,
  participantsDialogVisible: boolean,
  participantsError: boolean,
  participants: string[],
  participantsNetIds: string,
  participantValue: string,
  participantsErrorLabel : string,
}

class NewEventModal extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {
      name: '',
      description: '',
      label: '',
      fromDate: new Date().toISOString().slice(0, 19).replace('T', ' '),
      toDate: new Date().toISOString().slice(0, 19).replace('T', ' '),
      emptyFieldMessageVisible: false,
      participantsDialogVisible: false,
      participantsError: false,
      participants: [],
      participantsNetIds: '',
      participantValue: '',
      participantsErrorLabel: '',
    }
  }

  submit() {
    if(this.state.name === '' || this.state.description === '') {
      this.setState({
        emptyFieldMessageVisible: true,
      })
    }
    else {
      let eventId: string = uuidv4();
      try {
        fetch('/createEvent', {
          method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              eventId: eventId,
              creator: this.props.user,
              name: this.state.name,
              description: this.state.description,
              startTime: this.state.fromDate, /*There is an inconsistency with the naming scheme here (startTime and fromDate)*/
              endTime: this.state.toDate,
              label: this.state.label,
            }),
        }).then((response) => {
          this.props.onSuccessfulSubmit();
          //Add each participant once the event has been created
          for(let userId of this.state.participants) {
            console.log(userId);
            try {
              fetch('/addParticipant', {
                method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    eventId: eventId,
                    participant: userId,
                  }),
              }).then((response) => {this.props.onSuccessfulSubmit();})
            }
            catch(err) {
              console.log(err)
            }
          }
          this.closeModal();
        });
      }
      catch(err) {
        console.log(err);
      }
    }
  }

  closeModal() {
    //Ensure that all fields are reset
    this.setState({
      participants: [],
      participantsNetIds: '',
      emptyFieldMessageVisible: false,
      participantsError: false,
      participantsErrorLabel: '',
      participantValue: '',
      name: '',
      description: '',
      label: '',
    })
    this.props.onClose();
  }

  addParticipant() {
    //Check if user trys to add themselves
    if(this.state.participantValue === this.props.user) {
      this.setState({
        participantsError:true,
        participantsErrorLabel: 'You cannot be the participant of the event',
      })
    }
    else {
      fetch('/userExists', {
        method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            netId: this.state.participantValue,
          }),
      }).then((response) => response.json())
      .then((json) => {
        let participants : string[] = this.state.participants!;
        let participantsNetIds = this.state.participantsNetIds!;
        if(json[0]) {
          //Check if the new participant was already a participant in the list
          if(this.state.participants.includes(json[0].userId)) {
            this.setState({
              participantsError:true,
              participantsErrorLabel: 'You cannot add duplicated participants',
            })
          }
          //Add the new participant, reset and error messages
          else {
            participants.push(json[0].userId)
            participantsNetIds += json[0].netId + ', '
            this.setState({
              participants,
              participantsNetIds,
              participantsErrorLabel: '',
              participantValue: '',
              participantsError:false,});
          }
        }
        else {
          this.setState({
            participantsError:true,
            participantsErrorLabel: 'User does not exist',
          })
        }
      });
    }
  }

  handleDateChange()
  {

  }

  render() {

    return(
      <div>
        <Dialog maxWidth = {'md'} open = {this.props.visible} onBackdropClick = {() => {this.closeModal()}}>
          <DialogTitle>Create an event</DialogTitle>
              <DialogContent>
                {this.state.emptyFieldMessageVisible && <text style = {{color:'red'}} >Required: Name and Description</text> }
                <div style = {{flexDirection: 'column', }}>
                  <div style = {{display: 'flex'}}> <TextField error = {this.state.emptyFieldMessageVisible && (this.state.name === '')} id = "nameInput" label = "Name" onChange = {(e) => {this.setState({name: e.target.value})}} variant="outlined"/> </div>
                  <div style = {{display: 'flex'}}> <TextField error = {this.state.emptyFieldMessageVisible && (this.state.description === '')} id = "descriptionInput" label = "Description" onChange={(e) => {this.setState({description: e.target.value})}} variant="outlined"/> </div>
                  <div id = "time-selector">
                    {/*TODO: Check if the to and from dates make sense, you don't want the to date to be before the from date*/}
                    {/*MySQL date time format YYYY-MM-DD hh:mm:ss*/}
                    {/*In the onChange part of the KeyboardDateTimePicker component, the ! might cause problems down the line. The ! ignores the fact that it could be null.*/}
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <text>Starting:</text>
                      <KeyboardDateTimePicker fullWidth format="yyyy-MM-dd hh:mm:ss" margin="normal" value={this.state.fromDate} onChange={(e) => {
                        this.setState({fromDate: e!.toISOString().slice(0, 19).replace('T', ' ')});
                      }}/>
                      <text>Ending:</text>
                      <KeyboardDateTimePicker fullWidth format="yyyy-MM-dd hh:mm:ss" margin="normal" value={this.state.toDate} onChange={(e) => {
                        this.setState({toDate: e!.toISOString().slice(0, 19).replace('T', ' ')});
                      }}/>
                    </MuiPickersUtilsProvider>
                  </div>
                  <div style = {{display: 'flex'}}>
                    <TextField id = "descriptionInput" onChange={(e) => {this.setState({label: e.target.value})}} label = "Label" variant="outlined"/>
                    {/*Will Need to add color block for color selection*/}
                  </div>
                  <div>
                    <text>Participants: {this.state.participantsNetIds}</text>
                    <TextField error = {this.state.participantsError} value={this.state.participantValue} helperText= {this.state.participantsErrorLabel} label = "Participant" id = "participantInput" onChange={(e) => {this.setState({participantValue: e.target.value})}} variant="outlined"/>
                    <Button onClick = {() => {this.addParticipant()}}> Add Participant</Button>
                  </div>
                  <div>
                  <Button onClick = {() => {this.closeModal()}} style = {{color:'black'}}>Cancel</Button>
                  <Button onClick = {() => {this.submit()}} style = {{color:'black'}}>Create</Button>
                  </div>
                </div>
              </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default NewEventModal;

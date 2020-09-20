import * as React from 'react'
import { Dialog, DialogTitle, DialogContent, Button, TextField, NativeSelect } from '@material-ui/core/';
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';

interface IProps {
  //onSubmit: string,
  open: boolean,
  onClose: () => void,
}
interface IState {
  name: string,
  description: string,
  label: string,
  fromDate: Date,
  toDate: Date,
  emptyFieldMessageVisible: boolean,
}

class NewEventModal extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      name: '',
      description: '',
      label: '',
      fromDate: new Date(),
      toDate: new Date(),
      emptyFieldMessageVisible: false,
    }
  }
  submit() {
    if(this.state.name === '' || this.state.description === '') {
      this.setState({
        emptyFieldMessageVisible: true,
      })
    }
    else {
      fetch('http://localhost:8080/createEvent', {
        method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            creator: "111",
            name: this.state.name,
            description: this.state.description,
            label: this.state.label,
          }),
      }).then((response) => response.json())
      .then((json) => {
        alert(JSON.stringify(json))
      });
      this.props.onClose();
    }
  }
  render() {
    return(
      <div>
        <Dialog maxWidth = {'md'} open = {this.props.open} onBackdropClick = {() => {this.props.onClose()}}>
          <DialogTitle>Create an event</DialogTitle>
              <DialogContent>
                {this.state.emptyFieldMessageVisible && <text style = {{color:'red'}} >Required: Name and Description</text> }
                <div style = {{flexDirection: 'column', }}>
                  <div style = {{display: 'flex'}}> <TextField error = {this.state.emptyFieldMessageVisible && (this.state.name === '')} id = "nameInput" label = "Name" onChange = {(e) => {this.setState({name: e.target.value})}} variant="outlined"/> </div>
                  <div style = {{display: 'flex'}}> <TextField error = {this.state.emptyFieldMessageVisible && (this.state.description === '')} id = "descriptionInput" label = "Description" onChange={(e) => {this.setState({description: e.target.value})}} variant="outlined"/> </div>
                  <div id = "time-selector">
                    <text>From:</text>
                    <text>To:</text>
                  </div>
                  <div style = {{display: 'flex'}}>
                    <TextField id = "descriptionInput" onChange={(e) => {this.setState({label: e.target.value})}} label = "Label" variant="outlined"/>
                    {/*Will Need to add color block for color selection*/}
                  </div>
                  <div>
                  <Button onClick = {() => {this.props.onClose()}} style = {{color:'black'}}>Cancel</Button>
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

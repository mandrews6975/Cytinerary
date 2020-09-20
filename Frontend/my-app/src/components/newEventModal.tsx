import * as React from 'react'
import { Dialog, DialogTitle, DialogContent, Button, TextField, NativeSelect } from '@material-ui/core/';

interface IProps {
  //onSubmit: string,
  open: boolean,
  onClose: () => void,
}
interface IState {
  tasks?: string[],
  currentInput: string,
}

class NewEventModal extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      currentInput: '',
    }
  }
  post() {

  }
  render() {
    return(
      <div>
        <Dialog maxWidth = {'md'} open = {this.props.open} onBackdropClick = {() => {this.props.onClose()}}>
          <DialogTitle>Create an event</DialogTitle>
              <DialogContent>
                <div style = {{flexDirection: 'column', }}>
                  <div style = {{display: 'flex'}}> <TextField id = "nameInput" label = "Name" variant="outlined"/> </div>
                  <div style = {{display: 'flex'}}> <TextField id = "descriptionInput" label = "Description" variant="outlined"/> </div>
                  <div id = "time-selector">
                    <text>From</text>
                    <TextField label = "" variant="outlined"/>
                    <NativeSelect>
                      <option value = {"am"}>AM</option>
                      <option value = {"pm"}>PM</option>
                    </NativeSelect>
                    <text>To</text>
                    <TextField label = "" variant="outlined"/>
                    <NativeSelect>
                      <option value = {"am"}>AM</option>
                      <option value = {"pm"}>PM</option>
                    </NativeSelect>
                  </div>
                  <div style = {{display: 'flex'}}>
                    <TextField id = "descriptionInput" label = "Label" variant="outlined"/>
                    {/*Will Need to add color block for color selection*/}
                  </div>
                  <div>
                  <Button onClick = {() => {this.props.onClose()}} style = {{color:'black'}}>Cancel</Button>
                  <Button onClick = {() => {this.post(); this.props.onClose()}} style = {{color:'black'}}>Create</Button>
                  </div>
                </div>
              </DialogContent>

        </Dialog>
      </div>
    );
  }
}

export default NewEventModal;

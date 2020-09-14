import * as React from 'react'
import { Dialog, Button } from '@material-ui/core/';

interface IProps {
  //onSubmit: string,
  open: boolean,
  onClose: () => void,
}
interface IState {
}

class NewEventModal extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      currentInput: '',
    }
  }
  render() {
    return(
      <div>
        <Dialog maxWidth = {'md'} open = {this.props.open} onBackdropClick = {() => {this.props.onClose()}}>
                  <Button onClick = {() => {this.props.onClose()}} style = {{color:'black'}}>Cancel</Button>
                  <Button onClick = {() => {this.props.onClose()}} style = {{color:'black'}}>Create</Button>
        </Dialog>
      </div>
    );
  }
}

export default NewEventModal;

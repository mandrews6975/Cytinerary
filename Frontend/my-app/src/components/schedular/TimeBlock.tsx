import * as React from 'react'
import Draggable from 'react-draggable';

interface IProps {
  //onSubmit: string,
  // visible: boolean,
  // onClose: () => void,
  // user: string,
  yinit: number,
  xinit: number,
}
interface IState {
  activeDrags: number,
  deltaPosition: {
    x: number,
    y: number,
  }
}

class TimeBlock extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      activeDrags: 0,
      deltaPosition: {
        x: 0,
        y: 0,
      }
    }
  }

  onStart = () => {
  };

  onStop = () => {
  };

  render() {
    const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
    return(
      <Draggable disabled= {false} defaultPosition = {{x: this.props.xinit, y : this.props.yinit}} bounds= "body" grid={[96, 30]} {...dragHandlers}>
          <div className="box" style = {{borderColor: 'black', border:'solid', borderWidth: '1px', position: "absolute", minHeight: "58px", maxWidth: '83px', maxHeight: "58px", marginLeft: "5px", marginRight: "5px", backgroundColor:'red'}}>I am an event</div>
      </Draggable>
    );
  }
}

export default TimeBlock;

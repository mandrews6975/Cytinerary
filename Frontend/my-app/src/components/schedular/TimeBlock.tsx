import * as React from 'react'
import Draggable from 'react-draggable';

interface IProps {
  //onSubmit: string,
  // visible: boolean,
  // onClose: () => void,
  // user: string,
  yinit: number,
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
      <Draggable disabled= {true} defaultPosition = {{x: 0, y : this.props.yinit}} bounds= ".GridBody" grid={[123, 60]} {...dragHandlers}>
          <div className="box" style = {{minHeight: "60px", maxHeight: "60px", marginLeft: "5px", marginRight: "5px", backgroundColor:'red'}}>I am an event</div>
      </Draggable>
    );
  }
}

export default TimeBlock;

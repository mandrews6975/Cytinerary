import * as React from 'react'
import Draggable from 'react-draggable';

interface IProps {
  yinit: number,
  xinit: number,
  height: number,
  name?: string,
  description?: string,
  label?: string
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
      },
    }
  }

  onStart = () => {
  };

  onStop = () => {
  };

  render() {
    //{left: 0, top:0, right:200, bottom: 400}
    const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
    return(
      <Draggable disabled= {true} defaultPosition = {{x: this.props.xinit, y : this.props.yinit}} bounds= {'body'} grid={[96, 30]} {...dragHandlers}>
          <div className="box" style = {{textAlign: 'center', borderColor: 'black', border:'solid', borderWidth: '1px', position: "absolute", minHeight: this.props.height-2, maxWidth: '83px', maxHeight: this.props.height-2, marginLeft: "5px", marginRight: "5px", backgroundColor:'red'}}>{this.props.name}</div>
      </Draggable>
    );
  }
}

export default TimeBlock;

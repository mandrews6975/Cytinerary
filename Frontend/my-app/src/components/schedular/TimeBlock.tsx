import * as React from 'react'
import Draggable from 'react-draggable';

interface IProps {
  yinit: number,
  xinit: number,
  height: number,
  eventId: string,
  name?: string,
  description?: string,
  label?: string
  onClick: Function
  color: string
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
      <Draggable disabled= {false} defaultPosition = {{x: this.props.xinit, y : this.props.yinit}} bounds = {{left: 0, top: 0, right: 582, bottom: (1440- this.props.height)}} grid={[97, 15]} {...dragHandlers}>
          <div className="box" onClick = {() => {this.props.onClick(this.props.eventId)}} style = {{textAlign: 'center', opacity: '.7', border:'1px solid #000000', position: "absolute", minHeight: this.props.height-2, minWidth: '84px', maxWidth: '84px', maxHeight: this.props.height-2, marginLeft: "5px", marginRight: "10px", fontSize:'12px', color:'white', backgroundColor:this.props.color}}>{this.props.name}</div>
      </Draggable>
    );
  }
}

export default TimeBlock;

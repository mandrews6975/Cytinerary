import * as React from 'react'
import Draggable from 'react-draggable';

interface IProps {
  yinit: number,
  xinit: number,
  height: number,
  eventId: string,
  name?: string,
  description?: string,
  label?: string,
  onClick: Function,
  color: string,
  onDragEnd: Function,
  draggable: boolean,
  id: string,
}
interface IState {
  deltaPosition: {
    x: number,
    y: number,
  }
}

class TimeBlock extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      deltaPosition: {
        x: this.props.xinit,
        y: this.props.yinit,
      },
    }
  }


  onStart = () => {
  };

  handleDrag = (e, ui) => {
    const { x, y } = this.state.deltaPosition;
    //console.log(ui.deltaX + " " + ui.deltaY)
    if (ui.deltaX !== 0 || ui.deltaY !== 0) {
      this.setState({
        deltaPosition: {
          x: x + ui.deltaX,
          y: y + ui.deltaY,
        }
      });
    }
  }

  onStop = () => {
    //alert(this.state.deltaPosition.x + " " + this.state.deltaPosition.y)
    const e = {
      eventId: this.props.eventId,
      minutes: this.props.height,
      x: this.state.deltaPosition.x,
      y: this.state.deltaPosition.y,
    }
    this.props.onDragEnd(e)
  };

  render() {
    //{left: 0, top:0, right:200, bottom: 400}
    const dragHandlers = { onStart: this.onStart, onStop: this.onStop };
    return (
      //- 1 for the bounds at the bottom to prevent changes times to 0:00:00 the next day
      <Draggable disabled={!this.props.draggable} onDrag={(e, ui) => { this.handleDrag(e, ui) }} defaultPosition={{ x: this.props.xinit, y: this.props.yinit }} bounds={{ left: 0, top: 0, right: 582, bottom: (1440 - this.props.height - 1) }} grid={[97, 15]} {...dragHandlers}>
        <div id = {this.props.id} className="box" onClick={() => { this.props.onClick(this.props.eventId) }} style={{ textAlign: 'center', opacity: '.7', border: '1px solid #000000', position: "absolute", minHeight: this.props.height - 2, minWidth: '84px', maxWidth: '84px', maxHeight: this.props.height - 2, marginLeft: "5px", marginRight: "10px", fontSize: '12px', color: 'white', backgroundColor: this.props.color, cursor: 'grab' }}>{this.props.name}</div>
      </Draggable>
    );
  }
}

export default TimeBlock;

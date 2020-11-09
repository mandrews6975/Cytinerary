import * as React from 'react'
import Draggable from 'react-draggable';


/**
 * This interfae defines the props for this TimeBlock component
 * @author Lewis Sheaffer lewiss@iastate.edu
 */
interface TimeBlockProps {
  /**
   * This prop variable is the initial y postition of this event on the schedular grid
   */
  yinit: number,
  /**
   * This prop variable is the initial x position of this event on the schedular grid
   */
  xinit: number,
  /**
   * This is the desired height in pixels of this TimeBlock
   */
  height: number,
  /**
   * This is the eventId of the event this Time Block is representing
   */
  eventId: string,
  /**
   * This is the name of the event this Time Block is representing
   */
  name?: string,
  /**
   * This is the description the event this Time Block is representing
   */
  description?: string,
  /**
   * Thie is the label of the event this Time Block is representing
   */
  label?: string,
  /**
   * This function will eve executed when the timeblock is clicked
   */
  onClick: Function,
  /**
   * This is the color of the event this Time Block is representing
   */
  color: string,
  /**
   * This is the function will be executed when the timeblock is dragged
   */
  onDragEnd: Function,
  /**
   * This prop indicated whether the timeblock can be dragged or not
   */
  draggable: boolean,
  /**
   * This unique id is needed when mapping out multiple Time Blocks
   */
  id: string,
}


/**
 * This interface is defined the state variables used for this TimeBlock component
 * @author Lewis Sheaffer lewiss@iastate.edu
 */
interface TimeBlockState {
  /**
   * This is the relative position of this TimeBlock component
   */
  deltaPosition: {
    x: number,
    y: number,
  }
  chosencolor: string
}


/**
 * This is the TimeBlock jsx component that is mapped out onto the schedular grid
 * @author Lewis Sheaffer lewiss@iastate.edu
 */
class TimeBlock extends React.Component<TimeBlockProps, TimeBlockState> {
  componentDidMount() { this.getLabelColor(this.props.label) }
  /**
   * constructor - This is the constructor for the timeblock component
   *
   * @param  props: TimeBlockProps These are the props for this comonent
   */
  constructor(props: TimeBlockProps) {
    super(props);
    this.state = {
      deltaPosition: {
        x: this.props.xinit,
        y: this.props.yinit,
      },
      chosencolor: ''
    }
  }


  /**
   * This method will execute when the timeblock is first dragged
   */
  onStart = () => {
  };

  /**
   * This method updates the state of this component when this component is dragged
   */
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


  /**
   * This method executes when the component stops being dragged
   */
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

  getLabelColor(label?: string)
  {
    try {
      fetch('/getLabelColor', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          label: label
        }),
      }).then((response) => response.json())
        .then((json) => {
          let color: string;
          json.forEach((label: { label: string, color: string} ) => {
            color = label.color
            this.setState({
              chosencolor: color
            });
          });
        });
    } catch (err) {
      console.log(err);
    }

  }


  /**
   * render - This method returns the jsx elements that represent this TimeBlock component
   *
   * @return Returns the jsx contents for this TimeBlock component
   */
  render() {
    //{left: 0, top:0, right:200, bottom: 400}
    const dragHandlers = { onStart: this.onStart, onStop: this.onStop };
    return (
      //- 1 for the bounds at the bottom to prevent changes times to 0:00:00 the next day
      <Draggable disabled={!this.props.draggable} onDrag={(e, ui) => { this.handleDrag(e, ui) }} defaultPosition={{ x: this.props.xinit, y: this.props.yinit }} bounds={{ left: 0, top: 0, right: 582, bottom: (1440 - this.props.height - 1) }} grid={[97, 15]} {...dragHandlers}>
        <div
          id = {this.props.id}
          className="box"
          onClick={() => { this.props.onClick(this.props.eventId) }}
          style={{
            textAlign: 'center',
            opacity: '.7',
            border: '1px solid #000000',
            position: "absolute",
            minHeight: this.props.height - 2,
            minWidth: '84px', maxWidth: '84px',
            maxHeight: this.props.height - 2,
            marginLeft: "5px",
            marginRight: "10px",
            fontSize: '12px',
            color: 'white',
            backgroundColor: this.props.color,
            cursor: 'grab' }}>
          {this.props.name}
            {(this.props.height > 35) &&
            <text
              style={{
                color: '#' + this.state.chosencolor,
                textAlign: 'center',
                fontSize: '10px',
                fontWeight: 'bolder',
            }}
            >
            <br></br>
            {this.props.label}
            </text>
          }
        </div>
      </Draggable>
    );
  }
}

export default TimeBlock;

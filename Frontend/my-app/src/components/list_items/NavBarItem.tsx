import * as React from 'react'

import {
  NavLink,
} from "react-router-dom";

import {
  IconButton
} from '@material-ui/core';

interface IProps {
  title: string,
  linkTo: string
}
interface IState {
  selectedDate: Date,
  startDate: string,
  endDate: string,
  showEditEventDialogWindow: boolean,
  selectedEvent: string,
  updateEventDialogWindow: boolean,
  showViewParticipantEventDialogWindow: boolean
}

class ScheduleGrid extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

  }

  render() {
    return (

          <NavLink to= {this.props.linkTo} style = {{display:'flex', flexDirection:'column', alignItems:'center', width: '70px'}} activeStyle = {{width: '70px', backgroundColor:'DarkRed'}}>
            <IconButton
              edge='end'
              onClick={() => {}}
            >
              <div style = {{marginRight: '10px'}}>
                <div style= {{}}>
                  {this.props.children}
                </div>
                <div style= {{textDecoration: 'none', color: 'yellow', fontSize:'10px'}}>
                  {this.props.title}
                </div>
              </div>
            </IconButton>
          </NavLink>
    );
  }
}

export default ScheduleGrid;

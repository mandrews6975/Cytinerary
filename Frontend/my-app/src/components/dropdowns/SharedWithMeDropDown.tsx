import * as React from 'react'
import { v4 as uuidv4 } from 'uuid';

import '../../stylesheets/SchedularGrid.css'
import {
  IconButton
} from '@material-ui/core';
import {
  ArrowForward,
  ArrowBack
} from '@material-ui/icons';


interface IProps {
  userId: string,
}
interface IState {
}

class SharedWithMeDropDown extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
    }
  }

  //This will execute when the component is first initialized
  componentDidMount() {
  }

  render() {
    return (<p>Hello</p>);
  }
}

export default SharedWithMeDropDown;

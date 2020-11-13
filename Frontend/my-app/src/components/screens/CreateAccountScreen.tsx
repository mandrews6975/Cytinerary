import React from 'react';

import red from '@material-ui/core/colors/red';
import yellow from '@material-ui/core/colors/yellow';

import { TextField, Button, Typography } from '@material-ui/core'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  ACTION_userLogin
} from "../../state/reducers/AuthenticationReducer"

interface CreateAccountState {
  username: string,
  password: string,
}

interface CreateAccountProps {
  ACTION_userLogin: Function,
  redux_authentication: any
}

class CreateAccountScreen extends React.Component<CreateAccountProps, CreateAccountState>{

  constructor(props: CreateAccountProps) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  render() {
    return (
      <div>
          <h1>Create Account</h1>
          <TextField>UserName</TextField>
          <TextField>Password</TextField>
          <Button>Create Account</Button>
      </div>
    );
  }
}

export default CreateAccountScreen;

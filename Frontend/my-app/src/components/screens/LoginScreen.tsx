import React from 'react';

import red from '@material-ui/core/colors/red';
import yellow from '@material-ui/core/colors/yellow';

import { TextField, Button, Typography } from '@material-ui/core'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  ACTION_userLogin
} from "../../state/reducers/AuthenticationReducer"

/**
 * This is the interface used to define the state of this LoginScreen component
 * @author Lewis Sheaffer lewiss@iastate.edu
 */
interface LoginState {
  /**
   * This is the value of the username text input
   */
  username: string,
  /**
   * This is the entered value of the password text input
   */
  password: string,
}

/**
 * This is the inteface for the props of this LoginScreen component
 * @author Lewis Sheaffer lewiss@iastate.edu
 */
interface LoginProps {
  /**
   * This is the redux state actional type used to store the logged in user credential
   */
  ACTION_userLogin: Function,
  /**
   * This is the redux state variable that contains the userid of the current user
   */
  redux_authentication: any
}



/**
 * This is the login screen component for this application
 * @author Lewis Sheaffer lewiss@iastate.edu
 */
class LoginScreen extends React.Component<LoginProps, LoginState>{


  /**
   * constructor - This is the constructor for the LoginScreen Component, this is where the state is initialized
   *
   * @param props: LoginProps - This is the props interface specific to the login screen component
   */
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }


  /**
   * sendRequest - This method sends the request to the backend to authenticate the username and password. It will set the response in local storage accordingly
   */
  sendRequest() {
    fetch('/authenticateUser', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        netId: this.state.username,
        password: this.state.password
      }),
    }).then((response) => response.text())
      .then((text) => {
        if (text) {
          localStorage.setItem('userId', text);
          this.props.ACTION_userLogin(text);
        }
      });
  }


  /**
   * render - This is the render method for this component, it contains all of the visible frontend components for this login screen
   *
   * @return This method returns the displayed frontend jsx components for this login screen component
   */
  render() {
    return (
      <div style={{
        height: window.innerHeight,
        display: 'flex',
        backgroundColor: red[100],
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          height: window.innerHeight,
          width: window.innerWidth * 2 / 3,
          display: 'flex',
          backgroundColor: yellow[50],
          flexDirection: 'column',
          alignItems: 'center',
          borderLeft: '1px solid black',
          borderRight: '1px solid black'
        }}>
          <Typography variant='h2' style={{ marginBottom: '100px', marginTop: '50px' }}>
            Cytinerary
          </Typography>
          <TextField onChange={(event) => this.setState({ username: event.target.value })} label={"netId"} style={{ marginBottom: '20px' }} />
          <TextField onChange={(event) => this.setState({ password: event.target.value })} label={"Password"} style={{ marginBottom: '20px' }} inputProps={{ type: 'password' }} />
          <Button>Create Account</Button>
          <Button onClick={() => { this.sendRequest() }}>
            Login
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  const { authentication } = state;
  return { redux_authentication: authentication };
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
    ACTION_userLogin
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

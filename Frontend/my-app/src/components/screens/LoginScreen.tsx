import React from 'react';

import red from '@material-ui/core/colors/red';
import yellow from '@material-ui/core/colors/yellow';

import { TextField, Button, Typography, IconButton, InputAdornment } from '@material-ui/core';
import { ExpandMore, ExpandLess, VpnKey } from '@material-ui/icons';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  ACTION_userLogin
} from "../../state/reducers/AuthenticationReducer";
import { Redirect } from "react-router-dom";

import OverlapViewScheduleGrid from '../schedular/OverlapViewScheduleGrid';

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
  /**
   * Show schedule key section in login screen as expanded if true
   */
  scheduleKeySectionExpanded: boolean,
  /**
   * Schedule key input value
   */
  scheduleKeyInput: string
  /**
   * User ID of the user who's schedule is being requested view key entry
   */
  scheduleKeyUser: string,
  /**
   * Name of the user who's schedule is being requested view key entry
   */
  scheduleKeyUserName: string,
  /**
   * Email of the user who's schedule is being requested view key entry
   */
  scheduleKeyUserEmail: string,
  /**
   * Display error for invalid schedule key if true
   */
  scheduleKeyError: boolean,
  /**
   * Boolean indicating whether the user should be redirected to the create account screen.
   */
  createAccountBoolean: boolean,
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
      password: '',
      scheduleKeySectionExpanded: false,
      scheduleKeyInput: '',
      scheduleKeyUser: '',
      scheduleKeyUserName: '',
      scheduleKeyUserEmail: '',
      scheduleKeyError: false,
      createAccountBoolean: false,
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
    }).then((response) => response.json())
      .then((json) => {
        if (json.length > 0) {
          localStorage.setItem('userId', json[0]);
          localStorage.setItem('isAdmin', json[1]);
          this.props.ACTION_userLogin(json);
        }
      });
  }

  /**
   * getScheduleKeyUser requests the user ID of the user associated with a given schedule key
   */
  getScheduleKeyUser() {
    fetch('/getScheduleKeyUser', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        scheduleKey: this.state.scheduleKeyInput
      }),
    }).then((response) => response.json())
      .then((json) => {
        if (json.length > 0) {
          this.setState({ scheduleKeyUser: json[0].userId });
          this.getUser();
        } else {
          this.setState({ scheduleKeyError: true })
        }
      });
  }

  /**
   * getUser requests core user information associated with a given user ID
   */
  getUser() {
    fetch('/getUser', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        UserId: this.state.scheduleKeyUser
      }),
    }).then((response) => response.json())
      .then((json) => {
        if (json.length > 0) {
          this.setState({
            scheduleKeyUserName: json[0].firstName + ' ' + json[0].lastName,
            scheduleKeyUserEmail: json[0].netId + '@iastate.edu'
          });
        }
      });
  }

  /**
   * render - This is the render method for this component, it contains all of the visible frontend components for this login screen
   *
   * @return This method returns the displayed frontend jsx components for this login screen component
   */
  render() {
    if (this.state.createAccountBoolean) {
      return <Redirect to="/createaccount"></Redirect>
    }

    return (
      <div style={{
        minHeight: window.innerHeight,
        display: 'flex',
        backgroundColor: red[100],
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          minHeight: window.innerHeight,
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
          <Button onClick={() => { this.sendRequest() }}>
            Login
          </Button>
          <Button onClick={() => { this.setState({ createAccountBoolean: true }) }} style={{ marginBottom: '50px' }}>Create Account</Button>
          {this.state.scheduleKeySectionExpanded ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '35%',
              marginBottom: '100px'
            }}>
              <IconButton
                onClick={() => this.setState({ scheduleKeySectionExpanded: false })}
                id='schedule_key_section_close'
              >
                <ExpandLess />
              </IconButton>
              <TextField
                id='key'
                style={{ width: '100%', marginBottom: '20px' }}
                label="Schedule Key"
                variant='standard'
                value={this.state.scheduleKeyInput}
                error={this.state.scheduleKeyError}
                helperText={this.state.scheduleKeyError ? 'Invalid schedule key' : ''}
                InputProps={{
                  type: 'password',
                  startAdornment: (
                    <InputAdornment position="start">
                      <VpnKey />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button onClick={() => {
                        this.getScheduleKeyUser();
                        this.setState({ scheduleKeyInput: '' });
                      }}
                        id='schedule_key_submit'
                      >
                        Enter
                    </Button>
                    </InputAdornment>
                  )
                }}
                onChange={(event) => this.setState({ scheduleKeyInput: event.target.value })}
              />
              {this.state.scheduleKeyUser && (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <Typography variant='body1'>
                    {`${this.state.scheduleKeyUserName} - ${this.state.scheduleKeyUserEmail}`}
                  </Typography>
                  <OverlapViewScheduleGrid userIdArray={[this.state.scheduleKeyUser]} />
                </div>
              )}
            </div>
          ) : (<div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Typography variant='body1'>
              Have a schedule key?
            </Typography>
            <IconButton
              onClick={() => this.setState({ scheduleKeySectionExpanded: true })}
              id='schedule_key_section_expand'
            >
              <ExpandMore />
            </IconButton>
          </div>)}
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

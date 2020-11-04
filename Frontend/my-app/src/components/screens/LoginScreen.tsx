import React from 'react';

import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';
import yellow from '@material-ui/core/colors/yellow';

import {TextField, Button, Typography} from '@material-ui/core'

import {
  Person,
  Lock
} from '@material-ui/icons'

interface IState {
  username: string,
  password: string,
}

interface IProps {}

const colors = ({
  palette: {
    primary: {
      default: yellow[50]
    },
    secondary: {
      default: grey[900]
    },
    tertiary: {
      default: grey[50]
    },
    background: {
      default: red[100]
    }
  }
});

class App extends React.Component<IProps, IState>{

  constructor(props: IProps){
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

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
    alert(text)
  });
  }

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
          <Typography variant='h2' style={{marginBottom: '100px', marginTop: '50px'}}>
            Cytinerary
          </Typography>
          <TextField onChange = {(event) => this.setState({username: event.target.value})} label = {"netId"} style={{marginBottom: '20px'}}/>
          <TextField onChange = {(event) => this.setState({password: event.target.value})} label = {"Password"} style={{marginBottom: '20px'}} inputProps={{type: 'password'}}/>
          <Button onClick = {() => {this.sendRequest()}}>
            Login
          </Button>
        </div>
      </div>
    );
  }
}

export default App;

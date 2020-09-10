import React from 'react';

import './App.css';

import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';
import yellow from '@material-ui/core/colors/yellow';

import {
  Person,
  Lock
} from '@material-ui/icons'


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

class App extends React.Component{
  render() {
    return (
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: colors.palette.background.default, minHeight: window.innerHeight,
      }}>
      <h1 style={{position:'fixed', marginRight:564, marginBottom:800, fontFamily: 'monospace'}}>
        Cytinerary
      </h1>
        <view style={{position: 'fixed', backgroundColor: colors.palette.primary.default, borderStyle: 'solid', borderColor: colors.palette.secondary.default, width:700, height: 700}}>
        <h1 style={{position:'fixed', marginLeft:250, fontFamily: 'serif'}}>
          Sign In
        </h1>
          <h3 style={{marginTop:100, marginLeft:250, fontFamily: 'serif'}}>
            Username:
          </h3>
          <span style={{height: 20, width: 20, backgroundColor: colors.palette.tertiary.default, border:'solid', borderWidth: 1, borderRadius:50,display: 'inline-block', position:'fixed', marginLeft:215, marginTop:3}}>
            <Person style={{height: 15, width: 15, position:'fixed', color: 'inherit', marginLeft:2, marginTop:2}}/>
          </span>
          <input style={{width:170, marginLeft:250}}>
          </input>
          <h3 style={{marginTop:50, marginLeft:250, fontFamily: 'serif'}}>
            Password:
          </h3>
          <span style={{height: 20, width: 20, backgroundColor: colors.palette.tertiary.default, border:'solid', borderWidth: 1, borderRadius:50,display: 'inline-block', position:'fixed', marginLeft:215, marginTop:3}}>
            <Lock style={{height: 15, width: 15, position:'fixed', color: 'inherit', marginLeft:2, marginTop:2}}/>
          </span>
          <input style={{width:170, marginLeft:250}}>
          </input>
          <button style={{position:'fixed', bottom:1, marginBottom:450, marginLeft:-177}}>
            Login
          </button>
        </view>
      </div>
    );
  }
}

export default App;

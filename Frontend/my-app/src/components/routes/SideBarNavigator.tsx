import React from "react"
import {
  Link,
} from "react-router-dom";
import {
  Button,
} from '@material-ui/core'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  ACTION_userLogout
} from "../../state/reducers/AuthenticationReducer"

interface Props {
  redux_authentication: any,
  ACTION_userLogout: Function,
  children: any,
  path: string,
}


function SideBarNavigator(props: Props) {
  return (
    <div style = {{}}>
      <div style = {{display: 'flex', width: '150px', height: window.innerHeight, backgroundColor: 'red', position: 'absolute', flexDirection: 'column', alignItems: 'center'}}>
        <Button variant={'contained'} onClick = {() => {props.ACTION_userLogout(); localStorage.removeItem('userId')}}>
          Logout
        </Button>
        <div><Link to={`/home`}>Home</Link></div>
        <div><Link to={`/topics`}>Topics</Link></div>
      </div>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  const { authentication } = state;
  return { redux_authentication: authentication };
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
    ACTION_userLogout
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBarNavigator);

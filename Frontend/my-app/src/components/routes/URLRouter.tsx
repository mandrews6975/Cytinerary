import React, { useState } from 'react';


import LoginScreen from '../screens/LoginScreen'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  ACTION_userLogin
} from "../../state/reducers/AuthenticationReducer"

interface Props {
  redux_authentication: any,
  ACTION_userLogin: Function
}

function URLRouter(props: Props) {
  const userId = localStorage.getItem('userId');
  if (userId !== props.redux_authentication.userId) {
    props.ACTION_userLogin(userId);
    //console.log(this.propsredux_authentication.userId);
  }

  return (
    <Router>
      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <PublicRoute path="/login">
          <LoginScreen />
        </PublicRoute>
        <PrivateRoute path="/"/>
        <Route path="/">
          <LoginScreen />
        </Route>
      </Switch>
    </Router>
  );
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

export default connect(mapStateToProps, mapDispatchToProps)(URLRouter);

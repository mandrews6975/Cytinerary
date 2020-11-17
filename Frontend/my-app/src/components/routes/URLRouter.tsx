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
import CreateAccountScreen from '../screens/CreateAccountScreen';


/**
 * This interface defines the props for this URLComponent
 * @author Lewis Sheaffer lewiss@iastate.edu
 */
interface Props {

  /**
   * This is the redux state variable that contains any stored user credentials for this user
   */
  redux_authentication: any,

  /**
   * This is the redux state action type used to remove the users logged in credential when logging out
   */
  ACTION_userLogin: Function
}


/**
 * URLRouter - This is the base router for this application, it handles the base routing required for loggin in a user
 * @author Lewis Sheaffer lewiss@iastate.edu
 *
 * @param  props: Props These are the props specific to this URLRouter
 * @return Returns the React Router switch and routes for this application
 */
function URLRouter(props: Props) {
  const userId = localStorage.getItem('userId');
  if (userId !== props.redux_authentication.userId) {
    props.ACTION_userLogin([localStorage.getItem('userId'), localStorage.getItem('isAdmin')]);
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
        <PublicRoute path="/createaccount">
          <CreateAccountScreen />
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

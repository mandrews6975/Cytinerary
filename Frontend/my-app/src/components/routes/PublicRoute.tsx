import React from "react"
import {
  Route,
  Redirect
} from "react-router-dom";
import { connect } from 'react-redux';

/**
 * This interface defines the props for this PublicRouteComponent
 * @author Lewis Sheaffer lewiss@iastate.edu
 */
interface Props {
  /**
   *   This is the redux state variable that contains any stored user credentials for this user
   */
  redux_authentication: any,
  /**
   * This props represents the children JSX components that this component may wrap around
   */
  children: any,

  /**
   * This is the route path that this PublicRoute will represent
   */
  path: string
}

/**
 * PublicRoute - This function returns the public route component that will only route to the login screen when the user is bit logged in
 * @author Lewis Sheaffer lewiss@iastate.edu
 *
 * @param  props: Props These are the props for this PublicRoute Component
 * @return  This component returns routes specific to this PublicRoute
 */
function PublicRoute(props: Props) {
  return (
    <Route path={props.path}
      render={() =>
        props.redux_authentication.userId === null ? (
          props.children
        ) : (
            <Redirect to={{ pathname: '/' }} />
          )
      }
    />
  )
}

const mapStateToProps = (state: any) => {
  const { authentication } = state;
  return { redux_authentication: authentication };
}

export default connect(mapStateToProps)(PublicRoute);

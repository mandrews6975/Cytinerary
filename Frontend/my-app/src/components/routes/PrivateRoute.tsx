import React from "react"
import {
  Route,
  Redirect
} from "react-router-dom";
import { connect } from 'react-redux';


/**
 * This interface defines the props for this PrivateRouteComponent
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
   * This is the route path that this PrivateRoute will represent
   */
  path: string
}


/**
 * PrivateRoute - This function returns the private route component that will only route when the user is logged in
 *
 * @param  props: Props These are the props for this PrivateRoute Component
 * @return  This component returns routes specific to this PrivateRoute
 * @author Lewis Sheaffer lewiss@iastate.edu
 */
function PrivateRoute(props: Props) {
  return (
    <Route path={props.path}
      render={() =>
        props.redux_authentication.userId !== null ? (
          props.children
        ) : (
            <Redirect to={{ pathname: "/login" }} />
          )
      }
    />
  )
}

const mapStateToProps = (state: any) => {
  const { authentication } = state;
  return { redux_authentication: authentication };
}

export default connect(mapStateToProps)(PrivateRoute);

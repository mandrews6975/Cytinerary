import React from "react"
import {
  Route,
  Redirect
} from "react-router-dom";
import { connect } from 'react-redux';

interface Props {
  redux_authentication: any,
  children: any,
  path: string,
  notLoggedInPath: string
}

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

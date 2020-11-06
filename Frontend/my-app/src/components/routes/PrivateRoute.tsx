import React from "react"
import {
  Route,
  Redirect,
  Switch,
  useRouteMatch
} from "react-router-dom";
import { connect } from 'react-redux';
import SideBarNavigator from './SideBarNavigator'
import MyScheduleScreen from '../screens/MyScheduleScreen'

interface Props {
  redux_authentication: any,
  children: any,
  path: string,
}

function PrivateRoute(props: Props) {
  let { path, url } = useRouteMatch();
  return (
    <Route path={props.path}
      render={() =>
        props.redux_authentication.userId !== null ? (
          <div>
            <SideBarNavigator/>
            <div>
              <Switch>
                <Route exact path={path}>
                  <MyScheduleScreen />
                </Route>
                <Route path={`/home`}>
                  <MyScheduleScreen />
                </Route>
                <Route path={`/topics`}>
                  <p style = {{display: 'flex', justifyContent: 'center', alignItems: 'center', color:'black'}}>Hello</p>
                </Route>
              </Switch>
            </div>
          </div>
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

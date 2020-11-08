import React from "react"
import {
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { connect } from 'react-redux';
import SideBarNavigator from './SideBarNavigator'
import MyScheduleScreen from '../screens/MyScheduleScreen'
import ScheduleOverlapScreen from '../screens/ScheduleOverlapScreen'

interface Props {
  redux_authentication: any,
  path: string,
}

function PrivateRoute(props: Props) {
  //let  path  = useRouteMatch();
  return (
    <Route path={props.path}
      render={() =>
        props.redux_authentication.userId !== null ? (
          <div>
            <SideBarNavigator/>
            <div>
              <Switch>
                <Route exact path={props.path}>
                  <MyScheduleScreen />
                </Route>
                <Route path={`/home`}>
                  <MyScheduleScreen />
                </Route>
                <Route path={`/sharedschedules`}>
                  <ScheduleOverlapScreen />
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

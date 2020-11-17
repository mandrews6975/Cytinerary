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
  //let  path  = useRouteMatch();
  return (
    <Route path={props.path}
      render={() =>
        props.redux_authentication.userId !== null ? (
          <div>
            <SideBarNavigator />
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

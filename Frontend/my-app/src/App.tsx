import React, { useState } from 'react';

import MyScheduleScreen from './components/screens/MyScheduleScreen'
import LoginScreen from './components/screens/LoginScreen'
import { BrowserRouter as Router,
  Switch,
  Link,
  Route,
  Redirect
} from "react-router-dom";

function App() {
  const [showShareScheduleDialog, setShowShareScheduleDialog] = useState<boolean>(false);

  return (
    <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/">Login</Link>
                </li>
                <li>
                  <Link to="/home">Home</Link>
                </li>
              </ul>
            </nav>

            {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
            <Switch>
              <Route exact path="/home">
                <MyScheduleScreen />
              </Route>
              {/*<Route path="/login">
                <LoginScreen/>
              </Route>*/}
              <Route path="/">
                <LoginScreen/>
              </Route>
            </Switch>
          </div>
        </Router>
  );
}

export default App;

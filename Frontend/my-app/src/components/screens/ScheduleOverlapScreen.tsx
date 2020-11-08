import React, { useState } from 'react';
import {
  Button,
  ThemeProvider,
  createMuiTheme
} from '@material-ui/core'
import red from '@material-ui/core/colors/red';
import yellow from '@material-ui/core/colors/yellow';
import grey from '@material-ui/core/colors/grey';
import NewEventModal from '../dialog_windows/newEventModal'
import ScheduleGrid from '../schedular/ScheduleGrid'
import { connect } from 'react-redux';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: red[600]
    },
    secondary: {
      main: yellow[700]
    },
    type: 'dark',
    background: {
      paper: grey[800],
      default: grey[900]
    },
  },
  typography: {
    fontFamily: 'Roboto'
  }
});

interface Props {
  redux_authentication: any,
}

function ScheduleOverlapScreen(props: Props) {;
  const [showNewEventDialog, setNewEventDialog] = useState<boolean>(false);
  const [persistantState, forceUpdate] = useState<number>(0);
  const userId = props.redux_authentication.userId;
  return (
    <ThemeProvider
      theme={theme}
    >

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        height: window.innerHeight,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'row'
          //alignItems: 'center',
          //justifyContent: 'center'
        }}>

          <NewEventModal visible={showNewEventDialog} userId={userId} onSuccessfulSubmit = {() => {forceUpdate(0)}} onClose={() => { setNewEventDialog(false) }} />

          <Button color='primary' variant='contained' onClick={() => { setNewEventDialog(true) }}>Create a New Event</Button>
        </div>
        <div style={{
          display: 'flex',
          marginTop: '10px'
        }}>
          <ScheduleGrid userId = {userId}/>
        </div>
      </div>
    </ThemeProvider>
  );
}

const mapStateToProps = (state: any) => {
  const { authentication } = state;
  return { redux_authentication: authentication };
}


export default connect(mapStateToProps)(ScheduleOverlapScreen);

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
import ShareScheduleDialogWindow from '../dialog_windows/ShareScheduleDialogWindow';
import ScheduleGrid from '../schedular/ScheduleGrid'
import LabelDialogWindow from '../dialog_windows/LabelDialogWindow';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  ACTION_userLogout
} from "../../state/reducers/AuthenticationReducer"

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
  ACTION_userLogout: Function
}

function MyScheduleScreen(props: Props) {
  const [showShareScheduleDialog, setShowShareScheduleDialog] = useState<boolean>(false);
  const [showNewEventDialog, setNewEventDialog] = useState<boolean>(false);
  const [persistantState, forceUpdate] = useState<number>(0);
  const [showLabelDialog, setLabelDialog] = useState<boolean>(false);
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
          <ShareScheduleDialogWindow
            onClose={() => setShowShareScheduleDialog(false)}
            visible={showShareScheduleDialog}
            userId={userId}
          />
          <NewEventModal visible={showNewEventDialog} userId={userId} onSuccessfulSubmit = {() => {forceUpdate(0)}} onClose={() => { setNewEventDialog(false) }} />

          <Button
            color='primary'
            variant='contained'
            onClick={() => setShowShareScheduleDialog(true)}
          >
            Share
          </Button>
        <LabelDialogWindow
          onClose={() => setLabelDialog(false)}
          visible={showLabelDialog}
          userId = {userId}
        />
        <Button
          color='primary'
          variant='contained'
          onClick={() => setLabelDialog(true)}
        >
          Labels
        </Button>

          <Button color='primary' variant='contained' onClick={() => {
            try {
              fetch('/getEvents', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  creator: userId
                }),
            }).then((response) => response.json())
            .then((json) => {
              alert(JSON.stringify(json))
            });
          }catch(err){
            console.log(err);
          }
        }}>View this User's events</Button>

          <Button color='primary' variant='contained' onClick={() => { setNewEventDialog(true) }}>Create a New Event</Button>
        </div>
        <div style={{
          display: 'flex',
          marginTop: '10px'
          //alignItems: 'center',
          //justifyContent: 'center'
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

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
    ACTION_userLogout
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MyScheduleScreen);

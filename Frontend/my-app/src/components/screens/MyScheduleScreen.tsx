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


/**
 * This is the object used to store the base material ui theme for this component
 * @author Lewis Sheaffer lewiss@iastate.edu
 */
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

/**
 * This is the inteface for the props of this component
 * @author Lewis Sheaffer lewiss@iastate.edu
 */
interface MyScheduleScreenProps {
  /**
   * This is the prop containing the redux state variable for the logged in user credentials
   */
  redux_authentication: any,
}


/**
 * MyScheduleScreen - This is the jsx component for the screen that displays the users schedule and various components
 *
 * @param  props: MyScheduleScreenProps description
 * @return This function returns the entire MyScheduleScreen jsx component
 * @author Lewis Sheaffer lewiss@iastate.edu
 */
function MyScheduleScreen(props: MyScheduleScreenProps) {
  /**
   * This is the hook used toggle the displayed state of the shareScheduleDialog component
   */
  const [showShareScheduleDialog, setShowShareScheduleDialog] = useState<boolean>(false);
  /**
   * This is the hook used toggle the displayed state of the NewEventDialog component
   */
  const [showNewEventDialog, setNewEventDialog] = useState<boolean>(false);
  /**
   * This is the hook used to force rerender this component
   */
  const [persistantState, forceUpdate] = useState<number>(0);
  /**
   * This is the hook used toggle the displayed state of the labelDialog component
   */
  const [showLabelDialog, setLabelDialog] = useState<boolean>(false);
  /**
   * This is the variable used to store the userId credential for the logged in user from the global redux state
   */
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
          <LabelDialogWindow
            onClose={() => setLabelDialog(false)}
            visible={showLabelDialog}
            userId={userId}
          />
          <NewEventModal visible={showNewEventDialog} userId={userId} onSuccessfulSubmit={() => { forceUpdate(0) }} onClose={() => { setNewEventDialog(false) }} />
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <Button
                color='primary'
                variant='contained'
                onClick={() => setShowShareScheduleDialog(true)}
              >
                Share
            </Button>
            </div>
            <div>
              <Button
                color='primary'
                variant='contained'
                onClick={() => setLabelDialog(true)}
              >
                Labels
            </Button>
              <Button color='primary' variant='contained' onClick={() => { setNewEventDialog(true) }}>Create a New Event</Button>
            </div>
          </div>


        </div>
        <div style={{
          display: 'flex',
          marginTop: '10px'
          //alignItems: 'center',
          //justifyContent: 'center'
        }}>
          <ScheduleGrid userId={userId} />
        </div>
      </div>
    </ThemeProvider>
  );
}

const mapStateToProps = (state: any) => {
  const { authentication } = state;
  return { redux_authentication: authentication };
}


export default connect(mapStateToProps)(MyScheduleScreen);

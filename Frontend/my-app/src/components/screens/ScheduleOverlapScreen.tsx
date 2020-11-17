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
import AdminDropDown from '../dropdowns/AdminDropDown'
import SharedWithMeDropDown from '../dropdowns/SharedWithMeDropDown'
import OverlapViewScheduleGrid from '../schedular/OverlapViewScheduleGrid'
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


/**
 * This interface defines the props for the ScheduleOverlapScreen component
 */
interface ScheduleOverlapScreenProps {
  redux_authentication: any,
}


/**
 * ScheduleOverlapScreen - This is the screen component that allows the user to view and compare schedule of others
 * @author Lewis Sheaffer lewiss@iastate.edu
 * @param  props: ScheduleOverlapScreenProps This is the props object for this ScheduleOverlapScreen component
 * @return The jsx contents of the ScheduleOverlapScreen component
 */
function ScheduleOverlapScreen(props: ScheduleOverlapScreenProps) {
  ;
  const [showNewEventDialog, setNewEventDialog] = useState<boolean>(false);
  const [selectedUserIdsArray, updateSelectedArray] = useState<string[]>([]);
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
          {props.redux_authentication.isAdmin ?
            <AdminDropDown onUpdate={(selectedList) => { updateSelectedArray(selectedList) }} />
            :
            <SharedWithMeDropDown onUpdate={(selectedList) => { updateSelectedArray(selectedList) }} userId={userId} />
          }

          <NewEventModal visible={showNewEventDialog} userId={userId} onSuccessfulSubmit={() => { }} onClose={() => { setNewEventDialog(false) }} />

          <Button color='primary' variant='contained' onClick={() => { setNewEventDialog(true) }}>Create a New Event</Button>
        </div>
        <div style={{
          display: 'flex',
          marginTop: '10px'
        }}>
          <OverlapViewScheduleGrid userIdArray={selectedUserIdsArray} />
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

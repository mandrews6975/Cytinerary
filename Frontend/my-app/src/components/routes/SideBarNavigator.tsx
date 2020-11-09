import React, { useState } from "react"

import {
  Button,
  IconButton,
  Typography
} from '@material-ui/core'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  ACTION_userLogout
} from "../../state/reducers/AuthenticationReducer"
import {
  Event,
  PermContactCalendar,
  VpnKey
} from '@material-ui/icons';

import NavBarItem from '../list_items/NavBarItem'
import ShareScheduleKeyDialogWindow from '../dialog_windows/ShareScheduleKeyDialogWindow';

interface Props {
  redux_authentication: any,
  ACTION_userLogout: Function,
}

let iconStyle = {
  height: '30px',
  width: '30px',
  color: 'yellow'
}

function SideBarNavigator(props: Props) {
  const [showGenerateScheduleKeyDialog, setShowGenerateScheduleKeyDialog] = useState<boolean>(false);

  return (
    <div style={{}}>
      <ShareScheduleKeyDialogWindow
        visible={showGenerateScheduleKeyDialog}
        onClose={() => setShowGenerateScheduleKeyDialog(false)}
      />
      <div style={{ display: 'flex', width: '70px', height: window.innerHeight, borderRight: 'solid 1px black', backgroundColor: 'red', position: 'absolute', flexDirection: 'column', alignItems: 'center' }}>
        <Button variant={'contained'} style={{ maxWidth: '50px', fontSize: '10px' }} onClick={() => { props.ACTION_userLogout(); localStorage.removeItem('userId') }}>
          Logout
          </Button>
        <NavBarItem linkTo={'/home'} title={'Home'}>
          <Event style={iconStyle} />
        </NavBarItem>
        <NavBarItem linkTo={'/sharedschedules'} title={'Shared Schedules'}>
          <PermContactCalendar style={iconStyle} />
        </NavBarItem>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
          onClick={() => setShowGenerateScheduleKeyDialog(true)}
        >
          <IconButton
            style={iconStyle}
          >
            <VpnKey />
          </IconButton>
          <Typography
            style={{
              color: 'yellow',
              fontSize: '10px'
            }}
            align='center'
          >
            Share Schedule Key
        </Typography>
        </div>
      </div>
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SideBarNavigator);

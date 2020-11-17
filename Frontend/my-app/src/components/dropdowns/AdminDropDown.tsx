import * as React from 'react'
import { Multiselect } from 'multiselect-react-dropdown';

/**
 * This intergaface defines the props used by the SharedWithMeDropDown
 * @auther Lewis Sheaffer lewiss@iastate.edu
 */
interface AdminDropdownProps {
  /**
   * This function will be executed when a change in selection has been made to the dropdown.
   */
  onUpdate: Function,
}

/**
 * This interface defines the props used by the SharedWithMeDropDown component.
 */
interface AdminDropdownState {
  /**
   * This is an array containing a list of the selected users.
   */
  selectedUsers: { userId: string, userString: string }[];
}


/**
 * This is the SharedWithMeDropDown jsx component that is used in the ScheduleOverlapScreen
 * @authoer Lewis Sheaffer
 */
class AdminDropDown extends React.Component<AdminDropdownProps, AdminDropdownState> {
  numItems: number;
  constructor(props: AdminDropdownProps) {
    super(props);
    this.state = {
      selectedUsers: []
    }
    this.numItems = 0;
  }

  //This will execute when the component is first initialized
  componentDidMount() {
    this.fetchUsersWhoSharedWithMe();
  }


  /**
   * onUpdate - Creates a list of selected users and calls the onUpdate props method when the dropdown selection has changed.
   *
   * @param  selectedList This is a list that contains the user infor for those selected in the dropdown
   */
  onUpdate(selectedList) {
    let userIdArray: string[] = [];
    if (this.numItems !== 0) {
      selectedList.forEach((user) => {
        userIdArray.push(user.userId);
      });
    }
    this.props.onUpdate(userIdArray);
  }

  /**
   * fetchUsersWhoSharedWithMe - Retrieves the user info for those who have shared with this user.
   * Formats and stores the sharer info in and array in the component state
   */
  fetchUsersWhoSharedWithMe() {
    try {
      fetch('/getUsers', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      }).then((response) => response.json())
        .then((json) => {
          let userArray: { userId: string, userString: string }[] = [];
          json.forEach((user, index) => {
            let userObject = {
              userId: user.userId,
              userString: user.netId + ': ' + user.firstName + " " + user.lastName + "".repeat(index),
            }
            userArray.push(userObject);
          });
          this.setState({ selectedUsers: userArray });
        });
    }
    catch (err) {
      console.log(err);
    }
  }


  /**
   * render - render method which returns the jsx for this dropdown component
   *
   * @return Return the jsx for this dropdown component
   */
  render() {
    return (<Multiselect
      options={this.state.selectedUsers}
      onSelect={(selectedList) => { ++this.numItems; this.onUpdate(selectedList); }}
      onRemove={(selectedList) => { --this.numItems; this.onUpdate(selectedList); }}
      style={{ chips: { background: 'red' }, multiselectContainer: { width: '400px' }, inputField: { width: '400px' } }}
      selectionLimit={5}
      showCheckbox
      closeIcon={'cancel'}
      placeholder={"Type or Click to Select User's Schedules"}
      hidePlaceHolder={true}
      emptyRecordMsg={"No other users exist"}
      displayValue="userString"
    />);
  }
}

export default AdminDropDown;

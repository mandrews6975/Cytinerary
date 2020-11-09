import React from 'react';
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText
} from '@material-ui/core';


/**
 * This interface defines the props user by the SharDialogListItem component
 * @author Lewis Sheaffer lewiss@iastate.edu
 */
interface ShareDialogListItemProps {
  /**
   * This is name of the user that will be displayed
   */
  name: string,

  /**
   * This is the email of the user that will be displayed in this component
   */
  email: string,

  /**
   * This is the desired color of the timeblock component
   */
  color: string
}


/**
 * ShareDialogSearchListItem - This function returns the jsx list item used to display participants in the EditEventDialogWindow
 * @author Lewis Sheaffer lewiss@iastate.edu
 *
 * @param  props: ShareDialogListItemProps These are the props specific to this list item component
 * @return Returns jsx that display user's info in the form of a list item
 */
function ShareDialogSearchListItem(props: ShareDialogListItemProps) {

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar
          style={{
            backgroundColor: props.color,
            color: 'white'
          }}
        >
          {props.name.charAt(0)}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={props.name}
        secondary={props.email}
      />
    </ListItem>
  );

}

export default ShareDialogSearchListItem;

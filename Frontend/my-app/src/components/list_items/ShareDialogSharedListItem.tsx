import React from 'react';
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from '@material-ui/core';
import {
  Close
} from '@material-ui/icons';


/**
 * This inteface defines the props for the SharDialogSharedListItem Component
 * @author Lewis Sheaffer lewiss@iastate.edu
 */
interface ShareDialogShareListItemProps {
  /**
   * This is the user's name that will be displayed for this list item
   */
  name: string,
  /**
   * This is the user's email displayed for this list
   */
  email: string,
  /**
   * This is the color that will be used for this list item
   */
  color: string,
  /**
   * This function will be executed when the remove button for this component is clicked
   */
  onRemove: Function
}


/**
 * ShareDialogSharedListItem - This is a list item component that will reprsent a user this user has shared their schedule with
 * @author Lewis Sheaffer lewiss@iastate.edu
 *
 * @param   props: ShareDialogShareListItemProps These are the props of this component
 * @return               Returns the jsx component for this list item
 */
function ShareDialogSharedListItem(props: ShareDialogShareListItemProps) {

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
      <ListItemSecondaryAction>
        <IconButton
          edge='end'
          onClick={() => props.onRemove()}
        >
          <Close />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );

}

export default ShareDialogSharedListItem;

import React from 'react';
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText
} from '@material-ui/core';


/**
 * This intergace defines the props for this ShareDialogSearchListItem
 * @author Lewis Sheaffer lewiss@iastate.edu
 */
interface ShareDialogSearchListItemProps {
  /**
   * This is the name to be displayed in this list item
   */
  name: string,
  /**
   * This is the email to be displayed in this list item
   */
  email: string,
  /**
   * This is the color of this list item
   */
  color: string,
  /**
   * This function will be executed when the remove button of this component is clicked
   */
  onClick: Function
}

/**
 * ShareDialogSearchListItem - These is the listitem component displayed as a search result when searching for users to share with
 * @author Lewis Sheaffer lewiss@iastate.edu
 *
 * @param  props: ShareDialogSearchListItemProps This is the props specific to this ListItem component
 * @return                                       Returns the jsx component for this listItem
 */
function ShareDialogSearchListItem(props: ShareDialogSearchListItemProps) {

  return (
    <ListItem
      onClick={() => props.onClick()}
      style={{
        cursor: 'grab'
      }}
    >
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

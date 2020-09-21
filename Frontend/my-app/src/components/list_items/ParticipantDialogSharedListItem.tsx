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

interface Props {
  name: string,
  email: string,
  color: string,
  onRemove: Function
}

function ParticipantDialogSharedListItem(props: Props) {

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

export default ParticipantDialogSharedListItem;

import React from 'react';
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  Fab,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from '@material-ui/core';
import {
  Close
} from '@material-ui/icons';

interface Props {
  label: string,
  color: string,
  onRemove: Function
}

function LabelDialogListItem(props: Props) {

  return (
    <ListItem>
      <Fab
        style={{
          backgroundColor: '#' + props.color
        }}
        >
      </Fab>
      <ListItemText
        primary={props.label}
        secondary={props.color}
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

export default LabelDialogListItem;

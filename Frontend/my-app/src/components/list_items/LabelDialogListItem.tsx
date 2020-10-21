import React from 'react';
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  Fab,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography
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
        primary={
          <Typography style={{ paddingLeft: '10px', color: "#" + props.color}}>
            {props.label}
          </Typography>
        }
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

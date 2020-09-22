import React from 'react';
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText
} from '@material-ui/core';

interface Props {
  name: string,
  email: string,
  color: string,
  onClick: Function
}

function ShareDialogSearchListItem(props: Props) {

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

import React from 'react';
import {
  ListItem,
  ListItemText,
  Fab
} from '@material-ui/core';

interface Props {
  label: string,
  color: string,
  onClick: Function
}

function LabelDialogEventListItem(props: Props) {

  return (
    <ListItem
      onClick={() => props.onClick()}
      style={{
        cursor: 'grab'
      }}
    >
    <Fab
      style={{
        backgroundColor: '#' + props.color
      }}
      >
    </Fab>
      <ListItemText
        primary={props.label}
      />
    </ListItem>
  );
}

export default LabelDialogEventListItem;

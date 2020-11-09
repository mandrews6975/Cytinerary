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
  /**
 * A string representing a label
 * @author Vincent Woodward
 */
  label: string,
  /**
 * A string representing a color
 * @author Vincent Woodward
 */
  color: string,
  /**
 * A function defining what should be done when its removed
 * @author Vincent Woodward
 */
  onRemove: Function
}

/**
 * LabelDialogListItem
 * @param props
 * @return this component
 * @author Vincent Woodward
 */
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

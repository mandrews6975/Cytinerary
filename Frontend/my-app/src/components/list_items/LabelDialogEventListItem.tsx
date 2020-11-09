import React from 'react';
import {
  ListItem,
  ListItemText,
  Fab
} from '@material-ui/core';

interface Props {
  /**
 * A string representing a label
 * @author Vincent Woodward
 */
  label: string,
  /**
 * A string representing the color of a label
 * @author Vincent Woodward
 */
  color: string,
  /**
 * A function defining what should be done when clicked on
 * @author Vincent Woodward
 */
  onClick: Function
}

/**
 * LabelDialogEventListItem
 * @param props
 * @return this component
 * @author Vincent Woodward
 */
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

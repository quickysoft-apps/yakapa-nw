import React, { FC, ReactElement, MouseEventHandler } from 'react';
import { WithStyles, withStyles, ListItem } from '@material-ui/core';
import { BootstrapTooltip } from './BootstrapTooltip';

const styles = {
  button: {
    '&:hover': {
      backgroundColor: 'transparent'
    },
    '&:focus': {
      backgroundColor: 'transparent'
    },
    hover: {},
    focus: {}
  }
};

interface Props extends WithStyles<typeof styles> {
  tooltip: string;
  onClick?: MouseEventHandler;
}

const ExtensionMenuItemComponent: FC<Props> = props => {
  const { tooltip, onClick, classes } = props;
  return (
    <ListItem className={classes.button} button centerRipple onClick={onClick}>
      <BootstrapTooltip title={tooltip} placement="right">
        {props.children as ReactElement}
      </BootstrapTooltip>
    </ListItem>
  );
};

export const ExtensionMenuItem = withStyles(styles)(ExtensionMenuItemComponent);

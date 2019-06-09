import React, { FC, ReactElement, MouseEventHandler } from 'react';
import { WithStyles, withStyles, ListItem, Theme, StyleRulesCallback } from '@material-ui/core';
import { BootstrapTooltip } from './BootstrapTooltip';

const styles: StyleRulesCallback = (theme: Theme) => ({
  button: {
    '&:hover': {
      backgroundColor: 'transparent'
    },
    '&:focus': {
      backgroundColor: 'transparent'
    },
    hover: {},
    focus: {}
  },
  indicator: {
    backgroundColor: theme.palette.secondary.contrastText,
    top: '13px',
    left: '0px',
    width: '4px',
    position: 'absolute',
    borderRadius: '0px 3px 3px 0px',
    height: '36px'
  }
});

interface Props extends WithStyles<typeof styles> {
  tooltip: string;
  onClick?: MouseEventHandler;
  selected?: boolean;
}

const ExtensionMenuItemComponent: FC<Props> = props => {
  const { selected, tooltip, onClick, classes } = props;
  return (
    <ListItem className={classes.button} button centerRipple onClick={onClick}>
      {selected && <div className={classes.indicator} />}
      <BootstrapTooltip title={tooltip} placement="right">
        {props.children as ReactElement}
      </BootstrapTooltip>
    </ListItem>
  );
};

export const ExtensionMenuItem = withStyles(styles)(ExtensionMenuItemComponent);

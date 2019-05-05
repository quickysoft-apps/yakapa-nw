import React, { FC } from 'react';
import { List, ListItemIcon } from '@material-ui/core';
import { withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { ExtensionMenuItem, fireExtensionActivateEvent, ExtensionPart } from '@yakapa/shared';

const styles = (theme: Theme) => ({
  home: {
    color: '#fff',
    backgroundColor: theme.palette.primary.main
  },
  list: {
    padding: 0
  },
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
});

interface Props extends WithStyles<typeof styles> {}

const MenuComponent: FC<Props> = props => {
  const { classes } = props;

  const onMenuItemClick = () => {
    fireExtensionActivateEvent(ExtensionPart.Content, chrome.runtime.id);
  };

  return (
    <List className={classes.list}>
      <ExtensionMenuItem tooltip="Home" onClick={onMenuItemClick}>
        <ListItemIcon>
          <Avatar className={classes.home}>Y</Avatar>
        </ListItemIcon>
      </ExtensionMenuItem>
    </List>
  );
};

export const Menu = withStyles(styles, { withTheme: true })(MenuComponent);

import React, { FC } from 'react';
import { List, ListItem, ListItemIcon, WithStyles, withStyles } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import Avatar from '@material-ui/core/Avatar';
import { BootstrapTooltip, fireExtensionActivateEvent, ExtensionPart, ExtensionMenuItem } from '@yakapa/shared';

const styles = {
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
};

interface Props extends WithStyles<typeof styles> {}

const MenuComponent: FC<Props> = props => {
  const { classes } = props;

  const onMenuItemClick = () => {
    fireExtensionActivateEvent(ExtensionPart.Content, chrome.runtime.id);
  };

  return (
    <List className={classes.list}>
      <ExtensionMenuItem tooltip="Ajouter un réseau" onClick={onMenuItemClick}>
        <ListItemIcon>
          <Avatar>
            <Add />
          </Avatar>
        </ListItemIcon>
      </ExtensionMenuItem>
    </List>
  );
};

export const Menu = withStyles(styles)(MenuComponent);

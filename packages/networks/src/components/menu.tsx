import React, { FC } from 'react';
import { List, ListItemIcon, Theme, withStyles, WithStyles } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import Avatar from '@material-ui/core/Avatar';
import { fireExtensionActivateEvent, ExtensionPart, ExtensionMenuItem, fireExtensionEvent } from '@yakapa/shared';
import { Events } from '../events';

const styles = (theme: Theme) => ({
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

type Props = WithStyles<typeof styles>;

const MenuComponent: FC<Props> = props => {
  const { classes } = props;

  const onMenuItemClick = () => {
    fireExtensionActivateEvent(ExtensionPart.Content, chrome.runtime.id);
  };

  const onAddNetworkClick = () => {
    fireExtensionEvent(Events.OpenAddNetworkDialogEvent);
  };

  return (
    <List className={classes.list}>
      <ExtensionMenuItem tooltip="Ajouter un réseau" onClick={onAddNetworkClick}>
        <ListItemIcon>
          <Avatar>
            <Add />
          </Avatar>
        </ListItemIcon>
      </ExtensionMenuItem>
    </List>
  );
};

export const Menu = withStyles(styles, { withTheme: true })(MenuComponent);

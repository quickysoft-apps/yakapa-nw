import React, { FC } from 'react';
import { List, ListItemIcon } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Add } from '@material-ui/icons';
import Avatar from '@material-ui/core/Avatar';
import { fireExtensionActivateEvent, ExtensionPart, ExtensionMenuItem } from '@yakapa/shared';

const useStyles = makeStyles({
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

export const Menu: FC = () => {
  const classes = useStyles();

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

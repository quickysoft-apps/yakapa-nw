import React from 'react';
import { List, ListItem, ListItemIcon } from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import { ExtensionEvent, fireEvent } from '@yakapa/shared';

export const Menu = () => {
  const onMenuItemClick = () => {
    fireEvent({ type: ExtensionEvent.ActivateContent, token: chrome.runtime.id });
  };

  return (
    <List>
      <ListItem button onClick={onMenuItemClick}>
        <ListItemIcon>
          <MailIcon />
        </ListItemIcon>
      </ListItem>
    </List>
  );
};

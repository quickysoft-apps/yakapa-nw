import React from 'react';
import { List, ListItem, ListItemIcon } from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import { fireExtensionEvent, ExtensionEvent } from '@yakapa/shared';

//const styles = (theme: any) => ({});

interface Props {
  //classes: any;
}

export const Menu = (props: Props) => {
  const onMenuItemClick = () => {
    fireExtensionEvent(ExtensionEvent.InjectContent, chrome.runtime.id);
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

//export const Menu = withStyles(styles, { withTheme: true })(MenuComponent);

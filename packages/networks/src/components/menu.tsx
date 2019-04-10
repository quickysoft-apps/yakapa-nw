import React from 'react';
import { withStyles, List, ListItem, ListItemIcon } from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';

const styles = (theme: any) => ({});

interface Props {
  classes: any;
}

export const MenuComponent = (props: Props) => {
  const onMenuItemClick = () => {
    //FireEvent with (manifest.name)
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

export const Menu = withStyles(styles, { withTheme: true })(MenuComponent);

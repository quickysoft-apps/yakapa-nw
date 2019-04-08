import React from 'react';
import { withStyles, List, ListItem, ListItemIcon } from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';

import manifest from '../../manifest.json';

const styles = (theme: any) => ({});

interface Props {
  classes: any;
}

const ExtensionMenuComponent = (props: Props) => {
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

export const ExtensionMenu = withStyles(styles, { withTheme: true })(ExtensionMenuComponent);

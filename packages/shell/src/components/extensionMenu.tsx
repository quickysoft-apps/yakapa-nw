import React from 'react';
import { withStyles, Divider, List, ListItemText, ListItem, ListItemIcon } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import MailIcon from '@material-ui/icons/Mail';

import { RegisteredExtension } from '../extensions';

const drawerWidth = 241;
const extensionMenuWidth = 60;

const styles = (theme: any) => ({
  extensionMenuRoot: {
    height: '100%'
  },
  extensionMenuContainer: {
    display: 'flex',
    height: '100%'
  },
  extensionMenu: {
    width: extensionMenuWidth,
    backgroundColor: grey[900]
  },
  extensionSubMenu: {
    width: `calc(${drawerWidth}px - ${extensionMenuWidth}px)`,
    backgroundColor: '#2d2d2d'
  },
  toolbar: theme.mixins.toolbar
});

interface Props {
  classes: any;
  extensions: RegisteredExtension[];
  onMenuItemClick?: (extensionName?: string) => void;
}

const ExtensionMenuComponent = (props: Props) => {
  const { classes, extensions } = props;

  const onMenuItemClick = (extensionName?: string) => async () => {
    if (props.onMenuItemClick) {
      props.onMenuItemClick(extensionName);
    }
  };

  return (
    <div className={classes.extensionMenuRoot}>
      {extensions.map(ext => (
        <div className={classes.extensionMenuContainer}>
          <div className={classes.extensionMenu}>
            <List>
              <ListItem button key={ext.name} onClick={onMenuItemClick(ext.shortName)}>
                <ListItemIcon>
                  <MailIcon />
                </ListItemIcon>
              </ListItem>
            </List>
          </div>
          <div className={classes.extensionSubMenu}>
            <div className={classes.toolbar} />
            <Divider />
            <List>
              <ListItem button>
                <ListItemText primary={ext.name} />
              </ListItem>
            </List>
          </div>
        </div>
      ))}
    </div>
  );
};

export const ExtensionMenu = withStyles(styles, { withTheme: true })(ExtensionMenuComponent);

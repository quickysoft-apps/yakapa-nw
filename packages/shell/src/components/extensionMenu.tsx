import React, { Fragment } from 'react';
import { withStyles, Divider, List, ListItemText, ListItem, ListItemIcon } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import MailIcon from '@material-ui/icons/Mail';

import { RegisteredExtension } from '@yakapa/shared';

const drawerWidth = 241;
const extensionMenuWidth = 60;

const styles = (theme: any) => ({
  root: {
    height: '100%'
  },
  container: {
    display: 'flex',
    height: '100%'
  },
  menu: {
    width: extensionMenuWidth,
    backgroundColor: grey[900]
  },
  subMenu: {
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
    <div className={classes.root}>
      <div className={classes.container}>
        {extensions.map(ext => (
          <Fragment key={ext.name}>
            <div className={classes.menu}>
              <List>
                <ListItem button onClick={onMenuItemClick(ext.shortName)}>
                  <ListItemIcon>
                    <MailIcon />
                  </ListItemIcon>
                </ListItem>
              </List>
            </div>

            <div className={classes.subMenu}>
              <div className={classes.toolbar} />
              <Divider />
              <List>
                <ListItem button>
                  <ListItemText primary={ext.name} />
                </ListItem>
              </List>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export const ExtensionMenu = withStyles(styles, { withTheme: true })(ExtensionMenuComponent);

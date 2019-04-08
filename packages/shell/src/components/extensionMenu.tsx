import React, { Fragment } from 'react';
import { withStyles, Divider } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

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
  }
});

interface Props {
  classes: any;
  extensions: RegisteredExtension[];
}

const ExtensionMenuComponent = (props: Props) => {
  const { classes, extensions } = props;

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        {extensions.map(ext => (
          <Fragment key={ext.name}>
            <div>
              <div id={`extension-menu-${ext.name}`} className={classes.menu} />
              <Divider />
            </div>
            <div id={`extension-submenu-${ext.name}`} className={classes.subMenu} />
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export const ExtensionMenu = withStyles(styles, { withTheme: true })(ExtensionMenuComponent);

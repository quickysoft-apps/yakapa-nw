import React, { Fragment, useEffect } from 'react';
import { withStyles, Divider, Theme, AppBar, Toolbar, Typography } from '@material-ui/core';
import { RegisteredExtension, fireEvent, ExtensionEvent } from '@yakapa/shared';

const drawerWidth = 241;
const extensionMenuWidth = 72;

const styles = (theme: Theme) => ({
  root: {
    height: '100%'
  },
  subMenuBar: {
    'user-select': 'none',
    width: `calc(${drawerWidth}px - ${extensionMenuWidth}px)`
  },
  container: {
    display: 'flex',
    height: '100%'
  },
  menu: {
    width: extensionMenuWidth,
    backgroundColor: '#212121'
  },
  subMenu: {
    width: `calc(${drawerWidth}px - ${extensionMenuWidth}px)`,
    backgroundColor: '#2d2d2d'
  }
});

interface Props {
  classes: any;
  extensions: RegisteredExtension[];
  identifier?: string;
  opened?: boolean;
}

const ExtensionMenuComponent = (props: Props) => {
  useEffect(() => {
    if (props.opened) {
      extensions.forEach(extension => {
        if (extension.id) {
          fireEvent({ type: ExtensionEvent.InjectMenu, token: extension.id });
        }
      });
    }
  }, []);

  const { classes, extensions } = props;

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.menu}>
          {extensions.map((extension, index) => {
            return (
              <Fragment key={extension.shortName}>
                <div id={`extension-menu-${extension.id}${props.identifier ? `-${props.identifier}` : ''}`} />
                {index < extensions.length - 1 && <Divider />}
              </Fragment>
            );
          })}
        </div>
        <div className={classes.subMenu}>
          <AppBar position="relative" elevation={1} color="secondary" className={classes.subMenuBar}>
            <Toolbar variant="dense">
              <Typography variant="h6" color="inherit" noWrap>
                Yoyoyo
              </Typography>
            </Toolbar>
          </AppBar>
        </div>
      </div>
    </div>
  );
};

export const ExtensionMenu = withStyles(styles, { withTheme: true })(ExtensionMenuComponent);

import React, { Fragment, useEffect } from 'react';
import { withStyles, Divider, Theme, AppBar, Toolbar } from '@material-ui/core';
import { RegisteredExtension, fireExtensionInjectEvent, ExtensionPart, getExtensionRootId, registerEvent, getExtensionInjectEventType, ExtensionEventKind } from '@yakapa/shared';

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
    backgroundColor: theme.palette.secondary.dark
  },
  subMenu: {
    width: `calc(${drawerWidth}px - ${extensionMenuWidth}px)`,
    backgroundColor: theme.palette.secondary.main
  }
});

interface Props {
  classes: any;
  installedExtensions: RegisteredExtension[];
  activeExtensionId?: string;
  identifier?: string;
  opened?: boolean;
}

const ExtensionMenuComponent = (props: Props) => {
  useEffect(() => {
    if (props.opened) {
      installedExtensions.forEach(extension => {
        if (extension.id) {
          fireExtensionInjectEvent(ExtensionPart.Menu, extension.id);
        }
      });
    }
  }, []);

  const { classes, installedExtensions, activeExtensionId } = props;

  const getElementId = (extensionPart: ExtensionPart, extension: RegisteredExtension) =>
    `${getExtensionRootId(extensionPart, extension.id)}-${props.identifier ? `-${props.identifier}` : ''}`;

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.menu}>
          {installedExtensions.map((extension, index) => {
            return (
              <Fragment key={extension.shortName}>
                <div id={getElementId(ExtensionPart.Menu, extension)} />
                {index < installedExtensions.length - 1 && <Divider />}
              </Fragment>
            );
          })}
        </div>
        <div className={classes.subMenu}>
          <AppBar position="relative" elevation={1} color="secondary" className={classes.subMenuBar}>
            <Toolbar variant="dense">
              {installedExtensions.map(extension => {
                return (
                  <Fragment key={extension.shortName}>
                    <div id={getElementId(ExtensionPart.SubMenuToolbar, extension)} style={{ display: activeExtensionId === extension.id ? 'initial' : 'none' }} />
                  </Fragment>
                );
              })}
            </Toolbar>
          </AppBar>
          {installedExtensions.map(extension => {
            return (
              <Fragment key={extension.shortName}>
                <div id={getElementId(ExtensionPart.SubMenu, extension)} style={{ display: activeExtensionId === extension.id ? 'initial' : 'none' }} />
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const ExtensionMenu = withStyles(styles, { withTheme: true })(ExtensionMenuComponent);

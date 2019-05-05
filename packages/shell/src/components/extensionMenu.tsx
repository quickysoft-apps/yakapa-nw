import React, { Fragment, useEffect } from 'react';
import { withStyles, Divider, Theme, AppBar, Toolbar } from '@material-ui/core';
import { RegisteredExtension, fireExtensionInjectEvent, ExtensionPart, getExtensionRootId } from '@yakapa/shared';

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
  },
  indicator: {
    backgroundColor: theme.palette.secondary.contrastText,
    top: '13px',
    width: '4px',
    position: 'absolute',
    borderRadius: '0px 3px 3px 0px',
    height: '36px'
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

  const getCSSDisplayValue = (extension: RegisteredExtension) => (activeExtensionId === extension.id ? 'initial' : 'none');

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.menu}>
          {installedExtensions.map((extension, index) => {
            return (
              <div key={extension.shortName} style={{ position: 'relative' }}>
                <div className={classes.indicator} style={{ display: getCSSDisplayValue(extension) }} />
                <div id={getElementId(ExtensionPart.Menu, extension)} />
                {index < installedExtensions.length - 1 && <Divider variant="middle" />}
              </div>
            );
          })}
        </div>
        <div className={classes.subMenu}>
          <AppBar position="relative" elevation={1} color="secondary" className={classes.subMenuBar}>
            <Toolbar variant="dense">
              {installedExtensions.map(extension => {
                return (
                  <Fragment key={extension.shortName}>
                    <div id={getElementId(ExtensionPart.SubMenuToolbar, extension)} style={{ display: getCSSDisplayValue(extension) }} />
                  </Fragment>
                );
              })}
            </Toolbar>
          </AppBar>
          {installedExtensions.map(extension => {
            return (
              <Fragment key={extension.shortName}>
                <div id={getElementId(ExtensionPart.SubMenu, extension)} style={{ display: getCSSDisplayValue(extension) }} />
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const ExtensionMenu = withStyles(styles, { withTheme: true })(ExtensionMenuComponent);

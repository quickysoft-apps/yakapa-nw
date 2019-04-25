import React, { Fragment, useEffect } from 'react';
import { withStyles, Divider, Theme } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

import { RegisteredExtension, fireEvent, ExtensionEvent } from '@yakapa/shared';

const drawerWidth = 241;
const extensionMenuWidth = 72;

const styles = (theme: Theme) => ({
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
      </div>
    </div>
  );
};

export const ExtensionMenu = withStyles(styles, { withTheme: true })(ExtensionMenuComponent);

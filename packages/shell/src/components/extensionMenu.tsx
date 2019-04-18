import React, { Fragment, useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

import { registerEvent, fireExtensionEvent, RegisteredExtension, ExtensionEvent, findExtension } from '@yakapa/shared';

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
  identifier?: string;
}

const ExtensionMenuComponent = (props: Props) => {
  const { classes, extensions } = props;
  const [installedExtensions, setInstalledExtensions] = useState<RegisteredExtension[]>([]);

  const retrieveInstalledExtensions = async () => {
    const foundinstalledExtensions = await extensions.reduce(async (accumulator, extension) => {
      const foundInstalledExtension = !!extension.shortName && (await findExtension(extension.shortName));
      if (foundInstalledExtension) {
        return [...(await accumulator), { ...extension, id: foundInstalledExtension.id } as RegisteredExtension];
      } else {
        return accumulator;
      }
    }, Promise.resolve([] as RegisteredExtension[]));
    setInstalledExtensions(foundinstalledExtensions);
  };

  useEffect(() => {
    retrieveInstalledExtensions();
  }, [extensions]);

  useEffect(() => {
    installedExtensions.forEach(extension => {
      if (extension.id) {
        registerEvent(ExtensionEvent.Ready, extension.id, () => fireExtensionEvent(ExtensionEvent.InjectMenu, extension.id));
      }
      fireExtensionEvent(ExtensionEvent.InjectMenu, extension.id);
    });
  }, [installedExtensions]);

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.menu}>
          {installedExtensions.map(extension => {
            return (
              <Fragment key={extension.shortName}>
                <div id={`extension-menu-${extension.id}${props.identifier ? `-${props.identifier}` : ''}`} />
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const ExtensionMenu = withStyles(styles, { withTheme: true })(ExtensionMenuComponent);

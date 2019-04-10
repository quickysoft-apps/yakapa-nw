import React, { Fragment, useEffect, useState } from 'react';
import { withStyles, Divider } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

import { RegisteredExtension, getExtensionMenu } from '@yakapa/shared';

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

  const [menu, setMenu] = useState<JSX.Element>();

  const loadExtensions = async () => {
    const menus = await Promise.all(
      extensions.map(async ext => {
        console.log(ext);
        const shortName = ext.shortName;
        return shortName ? getExtensionMenu(shortName) : null;
      })
    );

    const menu = (
      <div className={classes.menu}>
        {menus.map((content: JSX.Element | null, index: number) => (
          <Fragment key={index}>
            {content}
            <Divider />
          </Fragment>
        ))}
      </div>
    );

    setMenu(menu);
  };

  useEffect(() => {
    loadExtensions();
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.container}>{menu}</div>
    </div>
  );
};

export const ExtensionMenu = withStyles(styles, { withTheme: true })(ExtensionMenuComponent);

import React from 'react';
import { render } from 'react-dom';
import { withStyles, AppBar, CssBaseline, Drawer, Hidden, IconButton, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useState } from 'react';
import { MainTheme, RegisteredExtensionCollection, RegisteredExtension, findExtension, removeExtension, injectExtension } from '@yakapa/shared';
import { extensions } from '../extensions.json';
import { useEffect } from 'react';
import { ExtensionMenu } from './components/extensionMenu';

export const drawerWidth = 241;

const styles = (theme: any) => ({
  root: {
    display: 'flex'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    'user-select': 'none',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  }
});

interface Props {
  classes: any;
  theme: any;
  container?: any;
}

const defaultRegisteredExtensions = {
  extensions: []
};

const Shell = (props: Props) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [registeredExtensions, setRegisteredExtensions] = useState<RegisteredExtensionCollection>(defaultRegisteredExtensions);
  const [activeExtension, setActiveExtension] = useState<RegisteredExtension>();
  const { classes, container } = props;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    setRegisteredExtensions({ extensions });
  }, []);

  const onMenuItemClick = async (extensionName?: string) => {
    if (extensionName) {
      const extension = await findExtension(extensionName);
      if (activeExtension) {
        removeExtension(activeExtension.id);
      }
      injectExtension(extension.id);
      setActiveExtension({ ...extension });
    }
  };

  return (
    <MainTheme>
      <CssBaseline />
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton color="inherit" aria-label="Open drawer" onClick={handleDrawerToggle} className={classes.menuButton}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              {activeExtension ? activeExtension.name : 'Welcome'}
            </Typography>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          <Hidden smUp implementation="css">
            <Drawer container={container} open={mobileOpen} onClose={handleDrawerToggle} classes={{ paper: classes.drawerPaper }}>
              <ExtensionMenu extensions={registeredExtensions.extensions} onMenuItemClick={onMenuItemClick} />
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer classes={{ paper: classes.drawerPaper }} variant="permanent" open>
              <ExtensionMenu extensions={registeredExtensions.extensions} onMenuItemClick={onMenuItemClick} />
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <div id="extension" />
        </main>
      </div>
    </MainTheme>
  );
};

const App = withStyles(styles, { withTheme: true })(Shell);

render(<App />, document.getElementById('root'));

import React from 'react';
import { render } from 'react-dom';
import { withStyles, AppBar, CssBaseline, Drawer, Hidden, IconButton, Toolbar, Typography } from '@material-ui/core';
import { MuiThemeProvider, Theme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import { useState } from 'react';
import { darkTheme } from '@yakapa/shared';
import { extensions } from '../extensions.json';
import { useEffect } from 'react';
import { RegisteredExtensionCollection, RegisteredExtension } from './extensions.js';
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
    userSelect: 'none',
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

const findExtension = (extensionName: string): Promise<chrome.management.ExtensionInfo> => {
  return new Promise((resolve, reject) => {
    chrome.management.getAll(result => {
      const ext = result.find(x => x.shortName === extensionName);
      if (ext) {
        chrome.management.getPermissionWarningsById(ext.id, warnings => {
          warnings.forEach(x => console.log(x));
        });
        resolve(ext);
      } else {
        reject(new Error('Extension not found'));
      }
    });
  });
};

const injectExtension = (id?: string) => {
  if (id) {
    const chromeExtensionUrl = `chrome-extension://${id}`;
    console.log('Inject', `(${chromeExtensionUrl})`);
    const event = document.createEvent('Event');
    event.initEvent(JSON.stringify({ inject: id }));
    document.dispatchEvent(event);
  }
};

const removeExtension = (id?: string) => {
  if (id) {
    const event = document.createEvent('Event');
    event.initEvent(JSON.stringify({ remove: id }));
    document.dispatchEvent(event);
  }
};

const defaultRegisteredExtensions = {
  extensions: []
};

const Shell = (props: Props) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [registeredExtensions, setRegisteredExtensions] = useState<RegisteredExtensionCollection>(defaultRegisteredExtensions);
  const [activeExtension, setActiveExtension] = useState<RegisteredExtension>();
  const { classes, theme, container } = props;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    setRegisteredExtensions({ extensions });
  }, []);

  const onMenuItemClick = async (extensionName?: string) => {
    if (extensionName) {
      const extension = await findExtension(extensionName);
      if (extension && activeExtension) {
        removeExtension(activeExtension.id);
      }
      if (extension) {
        injectExtension(extension.id);
        setActiveExtension({ ...extension });
      } else {
        console.log(`Unknown extension ${extensionName}`);
      }
    }
  };

  const isTheme = (theme: any): theme is Theme => {
    return !!theme.shape;
  };

  return isTheme(darkTheme) ? (
    <MuiThemeProvider theme={darkTheme}>
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
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper
              }}
            >
              <ExtensionMenu extensions={registeredExtensions.extensions} onMenuItemClick={onMenuItemClick} />
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper
              }}
              variant="permanent"
              open
            >
              <ExtensionMenu extensions={registeredExtensions.extensions} onMenuItemClick={onMenuItemClick} />
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <div id="extension" />
        </main>
      </div>
    </MuiThemeProvider>
  ) : null;
};

const App = withStyles(styles, { withTheme: true })(Shell);

render(<App />, document.getElementById('root'));

import React from 'react';
import { render } from 'react-dom';
import { withStyles, AppBar, CssBaseline, Divider, Drawer, Hidden, IconButton, List, ListItemText, Toolbar, Typography, ListItem } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import { useState } from 'react';
import { blueGrey, purple } from '@material-ui/core/colors';

const drawerWidth = 241;

const darkTheme = createMuiTheme({
  palette: {
    primary: {
      light: purple[300],
      main: purple[500],
      dark: purple[700]
    },
    secondary: {
      light: blueGrey[300],
      main: blueGrey[500],
      dark: blueGrey[700]
    },
    type: 'dark'
  }
});

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

type Extension = Partial<chrome.management.ExtensionInfo> & {
  extra?: boolean;
};

const availableExtensions: Extension[] = [
  {
    shortName: 'Settings',
    name: 'Chatbox'
  },
  {
    shortName: 'Runner',
    name: 'Runner'
  },
  {
    shortName: 'TODO',
    name: 'Settings',
    extra: true
  }
];

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

const Shell = (props: Props) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeExtension, setActiveExtension] = useState<Extension>();
  const { classes, theme, container } = props;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const onMenuItemClick = (extensionName?: string) => async () => {
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

  const menu = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {availableExtensions
          .filter(x => !x.extra)
          .map(ext => (
            <ListItem button key={ext.name} onClick={onMenuItemClick(ext.shortName)}>
              <ListItemText primary={ext.name} />
            </ListItem>
          ))}
      </List>
      <Divider />
      <List>
        {availableExtensions
          .filter(x => !!x.extra)
          .map(ext => (
            <ListItem button key={ext.name}>
              <ListItemText primary={ext.name} />
            </ListItem>
          ))}
      </List>
    </div>
  );

  return (
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
              {menu}
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
              {menu}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <div id="extension" />
        </main>
      </div>
    </MuiThemeProvider>
  );
};

const App = withStyles(styles, { withTheme: true })(Shell);

render(<App />, document.getElementById('root'));

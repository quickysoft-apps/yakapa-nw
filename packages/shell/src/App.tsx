import React from 'react';
import { render } from 'react-dom';
import { withStyles, AppBar, CssBaseline, Divider, Drawer, Hidden, IconButton, List, ListItemIcon, ListItemText, Toolbar, Typography, ListItem } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useState } from 'react';

const drawerWidth = 241;

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

interface Extension {
  name: string;
  title: string;
  extra?: boolean;
}

const Shell = (props: Props) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [extension, setExtension] = useState({ title: '' });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const onMenuItemClick = (extensionName: string) => () => {
    chrome.management.getAll(result => {
      const ext = result.find(x => x.shortName === extensionName);
      if (ext) {
        chrome.management.getPermissionWarningsById(ext.id, warnings => {
          warnings.forEach(x => console.log(x));
        });
        injectExtension(ext.id);
        setExtension({ title: ext.name });
      }
    });
  };

  const injectExtension = (id: string) => {
    const chromeExtensionUrl = `chrome-extension://${id}`;
    console.log('Inject', `(${chromeExtensionUrl})`);
    const event = document.createEvent('Event');
    event.initEvent(JSON.stringify({ inject: id }));
    document.dispatchEvent(event);
  };

  const { classes, theme, container } = props;

  const availableExtensions: Extension[] = [
    {
      name: 'Settings',
      title: 'Chatbox'
    },
    {
      name: 'Runner',
      title: 'Runner'
    },
    {
      name: 'TODO',
      title: 'Settings',
      extra: true
    }
  ];

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {availableExtensions
          .filter(x => !x.extra)
          .map(ext => (
            <ListItem button key={ext.name} onClick={onMenuItemClick(ext.name)}>
              <ListItemText primary={ext.title} />
            </ListItem>
          ))}
      </List>
      <Divider />
      <List>
        {availableExtensions
          .filter(x => !!x.extra)
          .map(ext => (
            <ListItem button key={ext.name}>
              <ListItemText primary={ext.title} />
            </ListItem>
          ))}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton color="inherit" aria-label="Open drawer" onClick={handleDrawerToggle} className={classes.menuButton}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" noWrap>
            {extension.title}
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
            {drawer}
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
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div id="extension" />
      </main>
    </div>
  );
};

const App = withStyles(styles, { withTheme: true })(Shell);

render(<App />, document.getElementById('root'));

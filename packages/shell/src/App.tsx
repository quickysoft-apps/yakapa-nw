import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { withStyles, AppBar, CssBaseline, Drawer, Hidden, IconButton, Toolbar, Theme } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useState } from 'react';
import { useInstalledExtensions, registerEvent, darkTheme, getExtensionInjectEventType, ExtensionEventKind, ExtensionPart, getExtensionRootId } from '@yakapa/shared';
import extensions from '../extensions.json';
import { ExtensionMenu } from './components/extensionMenu';
import { useEffect } from 'react';
import { MuiThemeProvider } from '@material-ui/core';

export const drawerWidth = 241;

const styles = (theme: Theme) => {
  return {
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
      },
      backgroundColor: theme.palette.background.default
    },
    menuButton: {
      marginRight: 20,
      [theme.breakpoints.up('sm')]: {
        display: 'none'
      }
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
      border: 'none'
    },
    content: {
      flexGrow: 1,
      marginTop: 50,
      padding: theme.spacing.unit * 3
    }
  };
};

interface Props {
  classes: any;
  theme: any;
  container?: any;
  reload?: boolean;
}

const Shell = (props: Props) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [reload, setReload] = useState<boolean | undefined>(props.reload);
  const installedExtensions = useInstalledExtensions(extensions, reload);
  const [activeExtensionId, setActiveExtensionId] = useState<string>();

  useEffect(() => {
    setReload(false);
  }, []);

  useEffect(() => {
    installedExtensions.forEach(extension => {
      if (extension.id) {
        registerEvent({ type: getExtensionInjectEventType(ExtensionEventKind.Activate, ExtensionPart.Content), token: extension.id }, () => setActiveExtensionId(extension.id));
      }
    });
  }, [installedExtensions]);

  const { classes, container } = props;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <div className={classes.root}>
        <nav className={classes.drawer}>
          <Hidden smUp implementation="css">
            <Drawer container={container} open={mobileOpen} onClose={handleDrawerToggle} classes={{ paper: classes.drawerPaper }}>
              <ExtensionMenu opened={mobileOpen} identifier="mobile" installedExtensions={installedExtensions} activeExtensionId={activeExtensionId} />
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer classes={{ paper: classes.drawerPaper }} variant="permanent" open>
              <ExtensionMenu opened={mobileOpen} identifier="desktop" installedExtensions={installedExtensions} activeExtensionId={activeExtensionId} />
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <AppBar position="fixed" elevation={1} className={classes.appBar}>
            <Toolbar variant="dense">
              <IconButton color="inherit" aria-label="Open drawer" onClick={handleDrawerToggle} className={classes.menuButton}>
                <MenuIcon />
              </IconButton>
              {installedExtensions.map(extension => (
                <div
                  key={extension.id}
                  id={getExtensionRootId(ExtensionPart.ContentToolbar, extension.id)}
                  style={{ display: activeExtensionId === extension.id ? 'initial' : 'none' }}
                />
              ))}
            </Toolbar>
          </AppBar>
          {installedExtensions.map(extension => (
            <div key={extension.id} id={getExtensionRootId(ExtensionPart.Content, extension.id)} style={{ display: activeExtensionId === extension.id ? 'initial' : 'none' }} />
          ))}
        </main>
      </div>
    </>
  );
};

const App = withStyles(styles, { withTheme: true })(Shell);

render(
  <MuiThemeProvider theme={darkTheme}>
    <CssBaseline />
    <App />
  </MuiThemeProvider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept(function() {
    const root = document.getElementById('root');
    if (root) {
      unmountComponentAtNode(root);
      render(<App reload />, root);
    }
  });
}

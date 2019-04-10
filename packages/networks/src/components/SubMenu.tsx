import React from 'react';
import { withStyles, Divider, List, ListItemText, ListItem } from '@material-ui/core';

const styles = (theme: any) => ({
  toolbar: theme.mixins.toolbar
});

interface Props {
  classes: any;
}

const ExtensionSubMenuComponent = (props: Props) => {
  const { classes } = props;

  const onMenuItemClick = () => {
    //TODO: //FireEvent with (manifest.name)
  };

  return (
    <>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem button>
          <ListItemText primary="Une action de l'ext" />
        </ListItem>
      </List>
    </>
  );
};

export const ExtensionMenu = withStyles(styles, { withTheme: true })(ExtensionSubMenuComponent);

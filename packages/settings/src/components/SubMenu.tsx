import React from 'react';
import { withStyles, Divider, List, ListItemText, ListItem, Theme } from '@material-ui/core';

const styles = (theme: Theme) => ({
  toolbar: theme.mixins.toolbar
});

interface Props {
  classes: any;
}

const SubMenuComponent = (props: Props) => {
  const { classes } = props;

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

export const SubMenu = withStyles(styles, { withTheme: true })(SubMenuComponent);

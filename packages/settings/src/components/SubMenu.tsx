import React from 'react';
import { withStyles, List, ListItemText, ListItem, Theme, ListSubheader } from '@material-ui/core';

const styles = (theme: Theme) => ({
  toolbar: theme.mixins.toolbar
});

interface Props {
  classes: any;
}

const SubMenuComponent = (props: Props) => {
  return (
    <>
      <List subheader={<ListSubheader>Paramètres utilisateur</ListSubheader>}>
        <ListItem button>
          <ListItemText primary="Compte" />
        </ListItem>
      </List>
    </>
  );
};

export const SubMenu = withStyles(styles, { withTheme: true })(SubMenuComponent);

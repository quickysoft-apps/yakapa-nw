import React from 'react';
import { List, ListItemText, ListItem, ListSubheader } from '@material-ui/core';

export const SubMenu = () => {
  const onAccountClick = () => {};

  return (
    <>
      <List subheader={<ListSubheader>Identification de l'agent</ListSubheader>}>
        <ListItem button onClick={onAccountClick}>
          <ListItemText primary="Compte" />
        </ListItem>
      </List>
    </>
  );
};

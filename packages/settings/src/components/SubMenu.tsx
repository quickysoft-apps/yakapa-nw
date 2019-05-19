import React from 'react';
import { List, ListItemText, ListItem, ListSubheader } from '@material-ui/core';

export const SubMenu = () => {
  const onAccountClick = () => {};

  return (
    <>
      <List subheader={<ListSubheader>Agent</ListSubheader>}>
        <ListItem button onClick={onAccountClick}>
          <ListItemText primary="Identification" />
        </ListItem>
      </List>
    </>
  );
};

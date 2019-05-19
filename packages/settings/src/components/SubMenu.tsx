import React from 'react';
import { List, ListItemText, ListItem, ListSubheader } from '@material-ui/core';

export const SubMenu = () => {
  const onIdentificationClick = () => {};

  return (
    <>
      <List subheader={<ListSubheader>Agent</ListSubheader>}>
        <ListItem button onClick={onIdentificationClick} selected>
          <ListItemText primary="Identification" />
        </ListItem>
      </List>
    </>
  );
};

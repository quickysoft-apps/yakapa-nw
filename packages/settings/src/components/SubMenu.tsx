import React, { useState } from 'react';
import { List, ListItemText, ListItem, ListSubheader } from '@material-ui/core';
import { fireExtensionSubActivateEvent } from '@yakapa/shared';

export const SubMenu = () => {
  const [selectedItemId, setSelectedItemId] = useState('identification');

  const onItemClick = (itemId: string) => {
    setSelectedItemId(itemId);
    fireExtensionSubActivateEvent(itemId, chrome.runtime.id);
  };

  return (
    <>
      <List subheader={<ListSubheader>Agent</ListSubheader>}>
        <ListItem button onClick={_ => onItemClick('identification')} selected={selectedItemId == 'identification'}>
          <ListItemText primary="Identification" />
        </ListItem>
        <ListItem button onClick={_ => onItemClick('test')} selected={selectedItemId == 'test'}>
          <ListItemText primary="Test" />
        </ListItem>
      </List>
    </>
  );
};

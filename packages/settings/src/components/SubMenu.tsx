import React, { useState, FC } from 'react';
import { List, ListItemText, ListItem, ListSubheader } from '@material-ui/core';
import { fireExtensionSubActivateEvent } from '@yakapa/shared';

export enum SettingsSubItem {
  Identification = 'identification',
  Test = 'test'
}

export const SubMenu = () => {
  const [itemId, setItemId] = useState(SettingsSubItem.Identification);

  const onItemClick = (itemId: SettingsSubItem) => {
    setItemId(itemId);
    fireExtensionSubActivateEvent(itemId, chrome.runtime.id);
  };

  const Item: FC<{ id: SettingsSubItem; text: string }> = props => (
    <ListItem button onClick={_ => onItemClick(props.id)} selected={itemId == props.id}>
      <ListItemText primary={props.text} />
    </ListItem>
  );

  return (
    <>
      <List subheader={<ListSubheader>Agent</ListSubheader>}>
        <Item id={SettingsSubItem.Identification} text="Identification" />
        <Item id={SettingsSubItem.Test} text="Test" />
      </List>
    </>
  );
};

import React from 'react';
import { Typography } from '@material-ui/core';
import { useSubActivateEvent } from '@yakapa/shared';
import { SettingsSubItem } from './SubMenu';

export const ContentToolbar = () => {
  const itemId = useSubActivateEvent<SettingsSubItem>(chrome.runtime.id) || SettingsSubItem.Identification;
  const items = new Map<SettingsSubItem, string>([[SettingsSubItem.Identification, 'Identification'], [SettingsSubItem.Test, 'Un test']]);
  return (
    <>
      <Typography>{items.get(itemId)}</Typography>
    </>
  );
};

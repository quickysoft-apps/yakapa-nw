import React from 'react';
import { useSubActivateEvent } from '@yakapa/shared';
import { AgentIdentification, AgentTest } from '../pages';
import { SettingsSubItem } from './SubMenu';

export const Content = () => {
  const itemId = useSubActivateEvent<SettingsSubItem>(chrome.runtime.id) || SettingsSubItem.Identification;

  return (
    <>
      {itemId === SettingsSubItem.Identification && <AgentIdentification />}
      {itemId === SettingsSubItem.Test && <AgentTest />}
    </>
  );
};

import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { registerEvent, ExtensionEventKind, SubActivatePayload } from '@yakapa/shared';

export const ContentToolbar = () => {
  const [itemId, setItemId] = useState<string>('identification');

  useEffect(() => {
    registerEvent({ type: ExtensionEventKind.SubActivate, token: chrome.runtime.id }, e => {
      const evt = e as CustomEvent<SubActivatePayload>;
      setItemId(evt.detail.subItemId);
    });
  }, []);

  const items = new Map<string, string>([['identification', 'Identification'], ['test', 'Un test']]);

  return (
    <>
      <Typography>{items.get(itemId)}</Typography>
    </>
  );
};

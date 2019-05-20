import { useState, useEffect } from 'react';
import { ExtensionEventKind, SubActivatePayload, registerEvent, unregisterEvent } from '../extensions';

export const useSubActivateEvent = <T extends {}>(extensionId: string) => {
  const [itemId, setItemId] = useState<T | null>(null);

  useEffect(() => {
    const eventIdentifier = { type: ExtensionEventKind.SubActivate, token: extensionId };
    const handler = (e: Event) => {
      const evt = e as CustomEvent<SubActivatePayload<T>>;
      setItemId(evt.detail.subItemId);
    };
    registerEvent(eventIdentifier, handler);

    return () => unregisterEvent(eventIdentifier, handler);
  }, []);

  return itemId;
};

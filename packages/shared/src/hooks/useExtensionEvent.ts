import { useEffect } from 'react';

import { registerEvent, unregisterEvent, EventIdentifier } from '../extensions';

export const useExtensionEvent = (type: string, handler: EventListenerOrEventListenerObject) => {
  const eventIdentifier: EventIdentifier = { type, token: chrome.runtime.id };
  useEffect(() => {
    registerEvent(eventIdentifier, handler);
    return () => unregisterEvent(eventIdentifier, handler);
  }, []);
  return eventIdentifier;
};

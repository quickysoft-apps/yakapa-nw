import { useEffect } from 'react';

import { registerEvent, unregisterEvent, EventIdentifier } from '../extensions';

export interface CustomEventListener<T> {
  (evt: CustomEvent<T>): void;
}

export const useExtensionEvent = <T>(type: string, handler: CustomEventListener<T>) => {
  const eventIdentifier: EventIdentifier = { type, token: chrome.runtime.id };
  useEffect(() => {
    registerEvent(eventIdentifier, handler as EventListenerOrEventListenerObject);
    return () => unregisterEvent(eventIdentifier, handler as EventListenerOrEventListenerObject);
  }, []);
  return eventIdentifier;
};

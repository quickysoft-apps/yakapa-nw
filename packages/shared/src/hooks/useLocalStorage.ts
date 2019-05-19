import { useEffect, useState, Dispatch } from 'react';

export const useLocalStorage = (key: string): [string | undefined, Dispatch<string>] => {
  const [localState, setLocalState] = useState<string | undefined>(undefined);

  useEffect(() => {
    chrome.storage.local.get(key, result => {
      setLocalState(result[key]);
    });
  }, []);

  useEffect(() => {
    chrome.storage.onChanged.addListener(onLocalStorageChange);
    return () => chrome.storage.onChanged.removeListener(onLocalStorageChange);
  }, []);

  const onLocalStorageChange = (changes: any) => {
    const change = changes[key];
    if (change) {
      setLocalState(changes[key].newValue);
    }
  };

  return [localState, (value: string) => chrome.storage.local.set({ [key]: value })];
};

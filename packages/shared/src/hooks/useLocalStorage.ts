import { useEffect, useState, Dispatch } from 'react';

export const useLocalStorage = (key: string): [string | undefined, Dispatch<string>] => {
  const [state, setState] = useState<string | undefined>(undefined);

  // useEffect(() => {
  //   chrome.storage.sync.get(key, result => {
  //     console.log(`Get from storage ${key}=${result[key]}`);
  //     setState(result[key]);
  //   });
  // }, []);

  // useEffect(() => {
  //   chrome.storage.onChanged.addListener(onLocalStorageChange);
  //   return () => chrome.storage.onChanged.removeListener(onLocalStorageChange);
  // }, []);

  // const onLocalStorageChange = (changes: any) => {
  //   const change = changes[key];
  //   if (change) {
  //     setState(changes[key].newValue);
  //   }
  // };

  return [state, (value: any) => chrome.storage.sync.set({ [key]: value })];
};

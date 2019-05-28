import { useEffect, useState, Dispatch } from 'react';
import PouchDB from 'pouchdb';

export const useLocalStorage = (key: string): [string | undefined, Dispatch<string>] => {
  const [state, setState] = useState<string | undefined>(undefined);

  useEffect(() => {
    chrome.storage.sync.get(key, result => {
      console.log(`Get from storage ${key}=${result[key]}`);
      setState(result[key]);
    });
  }, []);

  useEffect(() => {
    chrome.storage.onChanged.addListener(onLocalStorageChange);
    return () => chrome.storage.onChanged.removeListener(onLocalStorageChange);
  }, []);

  const onLocalStorageChange = (changes: any) => {
    const change = changes[key];
    if (change) {
      setState(changes[key].newValue);
    }
  };

  return [state, (value: any) => chrome.storage.sync.set({ [key]: value })];
};

export const useLocalDB = (key: string): [any | undefined, Dispatch<any>] => {
  const db = new PouchDB('yakapa');
  const id = 'app';

  const [state, setState] = useState<any | undefined>(undefined);
  const [rev, setRev] = useState<string | undefined>(undefined);

  useEffect(() => {
    db.get(id).then(doc => {
      const value = (doc as any)[key];
      console.log(`Get from storage ${key}=${value}`);
      setState(value);
      setRev(doc._rev);
    });
  }, []);

  return [state, (value: any) => db.put({ _id: 'app', _rev: rev, [key]: value })];
};

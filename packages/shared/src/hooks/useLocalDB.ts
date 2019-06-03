import { useEffect, useState, Dispatch } from 'react';
import PouchDB from 'pouchdb';

export const useLocalDB = <T>(key: string): [T | undefined, Dispatch<T>] => {
  const db = new PouchDB('yakapa');
  const id = 'app';

  const [state, setState] = useState<T | undefined>(undefined);
  const [rev, setRev] = useState<string | undefined>(undefined);

  useEffect(() => {
    db.get(id).then(doc => {
      const value = (doc as any)[key];
      console.log(`Get from storage ${key}=${value}`);
      setState(value);
      setRev(doc._rev);
    });
  }, []);

  return [state, (value: T) => db.put({ _id: 'app', _rev: rev, [key]: value })];
};

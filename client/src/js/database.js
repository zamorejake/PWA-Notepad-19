import { openDB } from 'idb';

const DB_NAME = 'jate';
const DB_VERSION = 1;
const DB_STORE_NAME = 'jate';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (param) => {
  try {
    const db = await openDB(DB_NAME, DB_VERSION);
    const readDB = db.transaction(DB_STORE_NAME, 'readwrite');
    const readStore = readDB.objectStore(DB_STORE_NAME);
    await readStore.put({value: param, id: 1});
    readDB.oncomplete;
  } catch (err) {
    console.error('Error: ', err);
    throw err;
  }
  };

export const getDb = async () => {
  try {
    const db = await openDB(DB_NAME, DB_VERSION);
    const writeDB = db.transaction(DB_STORE_NAME, 'readonly');
    const writeStore = writeDB.objectStore(DB_STORE_NAME);
    const data = await writeStore.get(1);
    return data.value;
  } catch (err) {
    console.error('Error: ', err);
    throw err;
  }
};

initdb();

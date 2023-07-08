import { openDB } from 'idb';

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

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) =>{
  console.log('Added to Database');
  const txDb = await openDB("jate", 1);
  const Txt = txDb.transaction("jate", "readwrite");
  const Storage = Txt.objectStore("jate");
  const rqt = Storage.put({
    id: 1,
    value: content,
  });
  const rst = await rqt;
  console.log("data saved to Db", rst);
};
//  console.error('putDb not implemented');

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log("Get all content from database");
  const txDb = await openDB("jate", 1);
  const Txt = txDb.transaction("jate", "readonly");
  const Storage = Txt.objectStore("jate");
  const rqt = Storage.get(1);
  const rst = await rqt;
  console.log("rst.value", rst);
  return rst?.value;
}
// console.error('getDb not implemented');

initdb();

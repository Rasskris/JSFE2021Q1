import { Data, ParamsOfCreateIndex, ParamsOfCreateStore, ParamsOfInitStorage } from '../interfaces/storage';
// import User from '../interfaces/user';

type SucsessCbOfGet = (data: Data[]) => void;

export default class Storage {
  storage: IDBDatabase | null = null;

  statusOfLastOperation: string | null = null;

  constructor({ nameDB, version, paramsOfCreateStore }: ParamsOfInitStorage) {
    this.init({ nameDB, version, paramsOfCreateStore });
  }
  
  init({ nameDB, version, paramsOfCreateStore }: ParamsOfInitStorage): void {
    const dbReq: IDBOpenDBRequest = indexedDB.open(nameDB, version);

    dbReq.onupgradeneeded = () => {
      const dataBase = dbReq.result;

      paramsOfCreateStore.forEach(({ nameStore, nameKeyPath, paramsOfCreateIndex }: ParamsOfCreateStore ) => {
        const store = dataBase.createObjectStore(nameStore, { keyPath: nameKeyPath});

        paramsOfCreateIndex.forEach(({indexName, keyPath, objectParameters}: ParamsOfCreateIndex) => {
          store.createIndex(indexName, keyPath, objectParameters);
        });
      });
    };

    dbReq.onsuccess = () => {
      this.storage = dbReq.result;
      this.recordStatus('DataBase created');
    };

    dbReq.onerror = () => {
      this.recordStatus('Error of init');
    };
  }

  add(data: Data, nameStore: string, mode: IDBTransactionMode, sucsessCb: VoidFunction, errorCb: VoidFunction): void {
    const tx = this.storage?.transaction(nameStore, mode) as IDBTransaction;
    const store = tx?.objectStore(nameStore);
    
    store.add(data);
    
    tx.oncomplete = () => {
      sucsessCb();
    };
    
    tx.onerror = () => {
      errorCb();
    };
  }
  
  recordStatus(status: string): void {
    this.statusOfLastOperation = status;
  }

  put(data: Data, nameStore: string, mode: IDBTransactionMode): void {
    const tx = this.storage?.transaction(nameStore, mode) as IDBTransaction;
    const store = tx?.objectStore(nameStore);
    
    store.put(data);
    
    tx.oncomplete = () => {
      this.recordStatus('Data put');
    };
    
    tx.onerror = () => {
      this.recordStatus('Error of put');
    };  
  }
  
  get(nameStore: string, mode: IDBTransactionMode, sucsessCb: SucsessCbOfGet): void{
    const tx = this.storage?.transaction(nameStore, mode) as IDBTransaction;
    if (!tx) return;
    
    const store = tx.objectStore(nameStore);
    const reqCursor = store.openCursor();
    const data: Data[] = [];
    
    reqCursor.onsuccess = () => {
      const cursor: IDBCursorWithValue | null = reqCursor.result;
      
      if (cursor) {
        data.push(cursor.value);
        cursor.continue();
      } else {
        sucsessCb(data);
      }
    };
    
    reqCursor.onerror = () => {
      this.recordStatus('Error of getting data');
    };
  }
}
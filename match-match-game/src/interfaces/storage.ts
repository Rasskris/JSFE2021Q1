export interface Data {
  [key: string]: string | number | null
}

export interface ParamsOfCreateIndex {
  indexName: string,
  keyPath: string,
  objectParameters: { unique: boolean },
}

export interface ParamsOfCreateStore {
  nameStore: string,
  nameKeyPath: string,
  paramsOfCreateIndex:  ParamsOfCreateIndex[]
}

export interface ParamsOfInitStorage {
  nameDB: string,
  version: number,
  paramsOfCreateStore: ParamsOfCreateStore[];
}

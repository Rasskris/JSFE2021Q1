import { ParamsOfInitStorage } from '../interfaces/storage';

const paramsOfInitStorage: ParamsOfInitStorage = {
  nameDB: 'rasskris',
  version: 1,
  paramsOfCreateStore: [
    {
      nameStore: 'users',
      nameKeyPath: 'id',
      paramsOfCreateIndex: [
        {
          indexName: 'id',
          keyPath: 'id',
          objectParameters: { unique: true },
        },
        {
          indexName: 'firstName',
          keyPath: 'firstName',
          objectParameters: { unique: false },
        },
        {
          indexName: 'lastName',
          keyPath: 'lastName',
          objectParameters: { unique: false },
        },
        {
          indexName: "email",
          keyPath: "email",
          objectParameters: { unique: true },
        }
      ]
    },
    {
      nameStore: 'scores',
      nameKeyPath: 'id',
      paramsOfCreateIndex: [
        {
          indexName: 'id',
          keyPath: 'id',
          objectParameters: { unique: false },
        },
        {
          indexName: 'score',
          keyPath: 'score',
          objectParameters: { unique: false },
        },
      ]
    },
  ],
};

export default paramsOfInitStorage;
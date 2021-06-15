import Loader from './loader';
import { DriveResponse } from '../types';
import { DrivePromise } from '../interfaces';

const engineAddress = 'http://127.0.0.1:3000/engine';

export default class Engine {
  URL: string;

  constructor() {
    this.URL = engineAddress;
  }

  async start(id: number, loader: Loader) {
    const options = {
      method: 'GET',
    };

    const { item: responseStartEngine } = await loader.request(this.URL, options, { id, status: 'started' });

    return responseStartEngine;
  }

  async stop(id: number, loader: Loader) {
    const options = {
      method: 'GET',
    };

    return loader.request(this.URL, options, { id, status: 'stopped' });
  }

  async drive(id: number, name: string, time: number): Promise<DrivePromise> {
    const response = await fetch(`${this.URL}?id=${id}&status=drive`).catch();

    let resultOfSuccess: DriveResponse;
    if (response.status === 200) {
      resultOfSuccess = await response.json();
    } else {
      resultOfSuccess = { success: false };
    }

    return {
      success: resultOfSuccess.success,
      id,
      name,
      time,
    };
  }
}

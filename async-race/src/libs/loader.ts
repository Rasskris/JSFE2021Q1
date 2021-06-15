import { RequestParameters, Car, Winner } from '../interfaces';

export default class Loader {
  private addRequestQuery(address: string, parameters?: RequestParameters): URL {
    const url = new URL(address);

    if (parameters) {
      Object.entries(parameters).forEach((parametr) => {
        const paramName = parametr[0] as string;
        const value = String(parametr[1]);

        url.searchParams.append(paramName, value);
      });
    }

    return url;
  }

  async request(address: string, options: RequestInit, parameters?: RequestParameters) {
    let requestInfo;

    if (parameters) {
      requestInfo = this.addRequestQuery(address, parameters).toString() as RequestInfo;
    } else {
      requestInfo = address.toString() as RequestInfo;
    }

    const response = await fetch(requestInfo, options);
    const result = await response.json();

    return {
      item: result,
      count: Number(response.headers?.get('X-Total-Count')),
    };
  }

  async getItems(URL: string, parameters: RequestParameters) {
    const options = {
      method: 'GET',
    };

    return this.request(URL, options, parameters);
  }

  async getItem(URL: string, id: number) {
    const options = {
      method: 'GET',
    };

    const { item } = await this.request(`${URL}/${id}`, options);
    return item;
  }

  async createItem(URL: string, body: Car | Winner) {
    const options = {
      body: JSON.stringify(body),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { item } = await this.request(URL, options);
    return item;
  }

  async updateItem(URL: string, id: number, body: Car | Winner) {
    const options = {
      body: JSON.stringify(body),
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { item } = await this.request(`${URL}/${id}`, options);
    return item;
  }

  async removeItem(URL: string, id: number) {
    const options = {
      method: 'DELETE',
    };

    const { item } = await this.request(`${URL}/${id}`, options);
    return item;
  }
}

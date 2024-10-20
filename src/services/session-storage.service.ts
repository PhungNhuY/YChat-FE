import { isValidJSON } from '../utils/json.util';

export class SessionStorageService {
  static set(key: string, value: string): void {
    sessionStorage.setItem(key, value);
  }

  static get(key: string): string | null {
    return sessionStorage.getItem(key);
  }

  static setObject(key: string, data: object): void {
    sessionStorage.setItem(key, JSON.stringify(data));
  }

  static getObject<T>(key: string): T | null {
    const jsonString = this.get(key);
    if (jsonString && isValidJSON(jsonString)) {
      return JSON.parse(jsonString) as T;
    }

    return null;
  }

  static remove(key: string): void {
    sessionStorage.removeItem(key);
  }
}

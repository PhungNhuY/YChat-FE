import { isValidJSON } from '../utils/json.util';

export default class LocalStorageService {
  static set(key: string, value: string): void {
    if (!localStorage) {
      console.error("don't have localStorage");
      return;
    }
    localStorage.setItem(key, value);
  }

  static get(key: string): string {
    if (!localStorage) {
      console.error("don't have localStorage");
      return '';
    }
    return localStorage.getItem(key) || '';
  }

  static setObject(key: string, data: object): void {
    if (!localStorage) {
      console.error("don't have localStorage");
      return;
    }
    localStorage.setItem(key, JSON.stringify(data));
  }

  static getObject<T>(key: string): T | Record<string, unknown> {
    const jsonString = this.get(key);
    if (isValidJSON(jsonString)) {
      return JSON.parse(jsonString) as T;
    }
    return {};
  }
}

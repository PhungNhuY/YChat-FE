import { isValidJSON } from '../utils/json.util';

export class SessionStorageService {
  private static check() {
    if (!sessionStorage) {
      console.error("don't have sessionStorage");
      return false;
    }
    return true;
  }
  static set(key: string, value: string): void {
    if (this.check()) {
      sessionStorage.setItem(key, value);
    }
  }

  static get(key: string): string | null {
    if (this.check()) {
      return sessionStorage.getItem(key);
    }
    return null;
  }

  static setObject(key: string, data: object): void {
    if (this.check()) {
      sessionStorage.setItem(key, JSON.stringify(data));
    }
  }

  static getObject<T>(key: string): T | null {
    if (this.check()) {
      const jsonString = this.get(key);
      if (jsonString && isValidJSON(jsonString)) {
        return JSON.parse(jsonString) as T;
      }
    }
    return null;
  }

  static remove(key: string): void {
    if (this.check()) {
      sessionStorage.removeItem(key);
    }
  }
}

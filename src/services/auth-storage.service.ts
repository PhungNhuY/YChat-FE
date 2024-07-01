import { LocalStorageService } from '.';
import { IUser } from '../types';

export class AuthStorageService {
  static setLoginUser(user: null | IUser): void {
    if (!user) {
      LocalStorageService.set('user', '');
    } else {
      LocalStorageService.setObject('user', user);
    }
  }

  static getLoginUser(): IUser {
    return LocalStorageService.getObject<IUser>('user');
  }

  static resetAll(): void {
    this.setLoginUser(null);
  }
}

import { AES, enc } from 'crypto-js';

export class Storage {
  private static encrypt (data: string) {
    let encrypted = AES.encrypt(data, process.env.REACT_APP_SECRET_KEY);

    return encrypted.toString();
  }

  private static decrypt (data: string): string {
    let decrypted = AES.decrypt(data, process.env.REACT_APP_SECRET_KEY);

    return decrypted.toString(enc.Utf8);
  }

  public static setItem (key: string, data: any) {
    const _toStringify = JSON.stringify(data);
    let _encrypted = this.encrypt(_toStringify);

    localStorage.setItem(key, _encrypted);
  }

  public static getItem<T = any> (key: string): T | null {
    let _fromStorage = localStorage.getItem(key);

    if (_fromStorage != null) {
      const _descrypted = this.decrypt(_fromStorage);
      try {
        return JSON.parse(_descrypted);
      } catch {
        return _descrypted as unknown as T;
      }
    }

    return _fromStorage;
  }
}

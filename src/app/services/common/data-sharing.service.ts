import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataSharingService {
  _subject = new BehaviorSubject<T>([]);
  constructor() {}
  
  onChange(data: Array<T>) {
    this._subject.next(data);
  }
}
type T = Array<string> | object;
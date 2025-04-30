import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { feedbackObj } from '../../constants/types';

@Injectable({
  providedIn: 'root',
})
export class DataSharingService {
  _subject = new BehaviorSubject<T>([]);
  _feedbackSubject = new BehaviorSubject<Array<feedbackObj>>([]);
  constructor() {}

  onChange(data: Array<T>) {
    this._subject.next(data);
  }

  onChangeObj(data: Array<feedbackObj>) {
    this._feedbackSubject.next(data);
  }
}
type T = Array<string> | object;

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { codingQuestionObj, feedbackObj } from '../../constants/types';

@Injectable({
  providedIn: 'root',
})
export class DataSharingService {
  _subject = new BehaviorSubject<T>([]);
  _feedbackSubject = new BehaviorSubject<Array<feedbackObj>>([]);
  _codeQuestionSubject = new BehaviorSubject<codingQuestionObj>({
    title: '',
    difficulty: '',
    topic: '',
    experience_level: '',
    problem_statement: '',
    example_input: '',
    example_output: '',
    hints: [''],
    follow_up_questions: [''],
    expected_skills: [''],
  });
  constructor() {}

  onChange(data: Array<T>) {
    this._subject.next(data);
  }

  onChangeObj(data: Array<feedbackObj>) {
    this._feedbackSubject.next(data);
  }

  onChangeCodeQuestion(data: codingQuestionObj) {
    this._codeQuestionSubject.next(data);
  }
}
type T = Array<string> | object;

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { QuestionResponse } from '../../constants/types';

@Injectable({
  providedIn: 'root',
})
export class FetchQuestionService {
  constructor(private _http: HttpClient) {}

  fetchQuestions(): Observable<QuestionResponse> {
    return this._http.get<QuestionResponse>(`${environment.apiURLQues}get-questions/`, {
      withCredentials: true,
    });
  }
  
  searchQuestions(term: string): Observable<QuestionResponse> {
    return this._http.get<QuestionResponse>(
      `${environment.apiURLQues}searchquestion?term=${term}`,
      {
        withCredentials: true,
      }
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { apiResponse, questionPayload } from '../../constants/types';

@Injectable({
  providedIn: 'root',
})
export class AddQuestionService {
  constructor(private _http: HttpClient) {}

  postQuestion(payload: questionPayload): Observable<apiResponse> {
    return this._http.post<apiResponse>(`${environment.apiURLQues}`, payload, {
      withCredentials: true,
    });
  }
}

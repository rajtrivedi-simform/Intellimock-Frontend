import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { questionAPIResponse } from '../../constants/types';

@Injectable({
  providedIn: 'root',
})
export class FetchQuestionByIdService {
  constructor(private _http: HttpClient) {}

  fetchQuestion(id: string): Observable<questionAPIResponse> {
    return this._http.get<questionAPIResponse>(`${environment.apiURLQues}get-question/${id}`, {
      withCredentials: true,
    });
  }
}

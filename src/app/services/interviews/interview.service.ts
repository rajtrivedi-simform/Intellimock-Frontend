import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { apiResponse, mockInterviewObj } from '../../constants/types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InterviewService {
  constructor(private _http: HttpClient) {}

  postMockInterview(data: mockInterviewObj): Observable<apiResponse> {
    const url = `${environment.apiURLInt}generate-mockinterview/`;

    return this._http.post<apiResponse>(url, data, {
      withCredentials: true,
    });
  }
}

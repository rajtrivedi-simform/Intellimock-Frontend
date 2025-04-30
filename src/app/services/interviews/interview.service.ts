import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import {
  apiResponse,
  mockInterviewObj,
  QuesAnswerObj,
  feedbackAPIResponse,
  codeInterviewObj,
} from '../../constants/types';
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

  generateFeedbackMockInterview(data: Array<QuesAnswerObj>): Observable<feedbackAPIResponse> {
    const url = `${environment.apiURLInt}get-mock-feedback/`;

    return this._http.post<feedbackAPIResponse>(url, data, {
      withCredentials: true,
    });
  }

  postCodeInterview(data: codeInterviewObj): Observable<apiResponse> {
    const url = `${environment.apiURLInt}generate-codeinterview/`;

    return this._http.post<apiResponse>(url, data, {
      withCredentials: true,
    });
  }
}

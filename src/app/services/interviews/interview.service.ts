import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { apiResponse, mockinterviewObj } from '../../constants/types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InterviewService {
  constructor(private _http: HttpClient) {}

  postInterview(data: mockinterviewObj): Observable<apiResponse> {
    const url = `${environment.apiURLInt}`;

    return this._http.post<apiResponse>(url, data, {
      withCredentials: true,
    });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { apiResponse } from '../../constants/types';

@Injectable({
  providedIn: 'root',
})
export class TerminateInterviewService {
  constructor(private _http: HttpClient) {}

  terminate(intId: string): Observable<apiResponse> {
    const payload: object = {
      intId: intId,
    };

    const url = `${environment.apiURLInt}terminate-mock-interview/`;

    return this._http.post<apiResponse>(url, payload, {
      withCredentials: true,
    });
  }
}

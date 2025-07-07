import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { apiResponse } from '../../constants/types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResumeUploaderService {
  constructor(private _http: HttpClient) {}

  uploadResume(payload: FormData): Observable<apiResponse> {
    return this._http.post<apiResponse>(`${environment.apiURLUser}resume/`, payload, {
      withCredentials: true,
    });
  }
}

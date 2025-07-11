import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { apiResponse } from '../../constants/types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: HttpClient) {}

  isLoginCheck(): Observable<apiResponse> {
    return this._http.get<apiResponse>(`${environment.apiURLAuth}auth/status`, {
      withCredentials: true,
    });
  }
}

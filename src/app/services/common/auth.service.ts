import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: HttpClient) {}

  isLoginCheck() {
    return this._http.get(`${environment.apiURLUser}auth/status`, {
      withCredentials: true,
    });
  }
}

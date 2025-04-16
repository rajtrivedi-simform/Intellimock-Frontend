import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LogoutService {
  constructor(private _http: HttpClient) {}

  logout(): Observable<void> {
    const url = `${environment.apiURLUser}logout/`;
    return this._http.get<void>(url, {
      withCredentials: true,
    });
  }
}

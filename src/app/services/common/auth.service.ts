import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { catchError, map, Observable, of } from 'rxjs';
import { apiResponse } from '../../constants/types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  isLoginCheck(): Observable<boolean> {
    return this.http
      .get<apiResponse>(`${environment.apiURLAuth}auth/status/`, {
        withCredentials: true,
      })
      .pipe(
        map((res) => {
          return res.success;
        }),
        catchError((err) => {
          return of(false);
        })
      );
  }
}

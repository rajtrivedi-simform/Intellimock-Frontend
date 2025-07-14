import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { apiResponse } from '../../constants/types';
import { catchError, map, Observable, of } from 'rxjs';

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
          if (typeof window !== 'undefined') {
            localStorage.setItem('isLogin', 'true');
          }
          return res.success;
        }),
        catchError(() => {
          if (typeof window !== 'undefined') {
            localStorage.setItem('isLogin', 'false');
          }
          return of(false);
        })
      );
  }
}

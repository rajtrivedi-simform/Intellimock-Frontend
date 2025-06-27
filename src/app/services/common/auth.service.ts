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
    // const res = this.http.get(`${environment.apiURLAuth}auth/status/`, {
    //   withCredentials: true,
    // });

    // return new Promise<boolean>((resolve) => {
    //   res.subscribe({
    //     next: (data: any) => {
    //       console.log(data);
    //       if (data) {
    //         resolve(true);
    //       } else {
    //         resolve(false);
    //       }
    //     },
    //     error: (err) => {
    //       console.error(err.message);
    //       resolve(false);
    //     },
    //   });
    // });

    return this.http
      .get<apiResponse>(`${environment.apiURLAuth}auth/status/`, {
        withCredentials: true,
      })
      .pipe(
        map((res) => {
          console.log(res);
          return res.success;
        }),
        catchError((err) => {
          // console.error(err.message);
          return of(false);
        })
      );
  }
}

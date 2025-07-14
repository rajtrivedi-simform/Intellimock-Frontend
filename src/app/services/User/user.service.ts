import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { userProfileResponse } from '../../constants/types';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _http: HttpClient) {}

  getUserDetails(): Observable<userProfileResponse> {
    return this._http.get<userProfileResponse>(environment.apiURLUser, {
      withCredentials: true,
    });
  }
}

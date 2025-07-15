import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { apiResponse, profileResponse, userProfilePayload } from '../../constants/types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  constructor(private _http: HttpClient) {}

  getUserProfile(): Observable<profileResponse> {
    const url = `${environment.apiURLUser}profile/`;

    return this._http.get<profileResponse>(url, {
      withCredentials: true,
    });
  }

  postUserProfile(payload: userProfilePayload): Observable<apiResponse> {
    const url = `${environment.apiURLUser}profile/`;

    return this._http.post<apiResponse>(url, payload, {
      withCredentials: true,
    });
  }
}

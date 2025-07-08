import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { userProfilePayload } from '../../constants/types';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  constructor(private _http: HttpClient) {}

  getUserProfile() {
    const url = `${environment.apiURLUser}profile/`;

    return this._http.get(url, {
      withCredentials: true,
    });
  }

  postUserProfile(payload: userProfilePayload) {
    const url = `${environment.apiURLUser}profile/`;

    return this._http.post(url, payload, {
      withCredentials: true,
    });
  }
}

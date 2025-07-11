import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { apiResponse, skillsAPIResponse } from '../../constants/types';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  constructor(private _http: HttpClient) {}

  getUserProfile(): Observable<apiResponse> {
    const url = `${environment.apiURLUser}profile/`;

    return this._http.get<apiResponse>(url, {
      withCredentials: true,
    });
  }

  getUserSkills(): Observable<skillsAPIResponse> {
    const url = `${environment.apiURLUser}skill/`;

    return this._http.get<skillsAPIResponse>(url, {
      withCredentials: true,
    });
  }
}

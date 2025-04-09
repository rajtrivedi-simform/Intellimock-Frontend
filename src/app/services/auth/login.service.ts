import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { userObjLogin } from '../../constants/types';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  userLogin(data: userObjLogin) {
    const url = `${environment.apiURL}login/`;
    return this.http.post(url, data, {
      withCredentials: true,
    });
  }
}

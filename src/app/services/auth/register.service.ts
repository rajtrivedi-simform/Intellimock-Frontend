import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userObjRegister } from '../../constants/types';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  registerUser(data: userObjRegister) {
    const url = `${environment.apiURL}register/`;
    return this.http.post(url, data, {
      withCredentials: true,
    });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { IAuth, IRegisterPayload, IUser } from '../interfaces';
import { Observable } from 'rxjs';
import { IApiResponse, IAuthResponse } from '../interfaces/IAut';
import {
  getCurrentTimestamp,
  getDecodedAccessToken,
  timestampToDate,
} from '../utils/date';
import { PersonService } from './person.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: IUser = {
    id: 0,
    name: '',
    email: '',
  };

  constructor(private http: HttpClient, private personService: PersonService) {}

  register(payload: IRegisterPayload): Observable<IApiResponse> {
    return this.http.post<IApiResponse>(
      `${environment.apiUrl}/register`,
      payload
    );
  }

  login(payload: IAuth): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(
      `${environment.apiUrl}/login`,
      payload
    );
  }

  logout() {
    return this.http.get<boolean>(`${environment.apiUrl}/logout`);
  }

  getUser(id: number): Observable<IAuthResponse> {
    return this.http.get<IAuthResponse>(`${environment.apiUrl}/user/${id}`);
  }

  getRoles() {
    const data = localStorage.getItem('roles');
    const roles = JSON.parse(data || '');
    return roles;
  }

  getUserStorage() {
    const data = localStorage.getItem('user');
    if (data) {
      const result = JSON.parse(data);
      this.user = result;
    }
    return this.user;
  }

  onIsPerson() {
    if (localStorage.getItem('person')) return true;
    return false;
  }

  onIsUser() {
    if (localStorage.getItem('user')) return true;
    return false;
  }

  isExpiredSession(): boolean {
    const token = localStorage.getItem('token');
    const payload = getDecodedAccessToken(token || '');

    const currentDate = timestampToDate(getCurrentTimestamp());
    const expirationDate = timestampToDate(payload?.exp || 0);

    if (currentDate > expirationDate) return true;
    return false;
  }
}

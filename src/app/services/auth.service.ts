import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { IAuth } from '../interfaces';
import { Observable } from 'rxjs';
import { IAuthResponse } from '../interfaces/IAut';
import {
  getCurrentTimestamp,
  getDecodedAccessToken,
  timestampToDate,
} from '../utils/date';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(payload: IAuth): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(
      `${environment.apiUrl}/login`,
      payload
    );
  }

  logout() {
    return this.http.get<boolean>(`${environment.apiUrl}/logout`);
  }

  isExpiredSession(): boolean {
    const token = localStorage.getItem('token');
    const payload = getDecodedAccessToken(token || '');

    const currentDate = timestampToDate(getCurrentTimestamp());
    const expirationDate = timestampToDate(payload?.exp || 0);

    if (currentDate > expirationDate) return true;
    return false;
  }

  getUser() {
    const user = localStorage.getItem('user');

    if (user) {
      return { user: JSON.parse(user), success: true };
    }
    return { success: false };
  }

  getPerson() {
    const data = localStorage.getItem('person');

    if (data) {
      const person = JSON.parse(data);

      if (person.length > 0) {
        return { person: person[0], success: true };
      }
    }
    return { success: false };
  }
}

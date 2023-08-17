import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { IAuth, IRegisterPayload } from '../interfaces';
import { Observable } from 'rxjs';
import { IApiResponse, IAuthResponse } from '../interfaces/IAut';
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

  isExpiredSession(): boolean {
    const token = localStorage.getItem('token');
    const payload = getDecodedAccessToken(token || '');

    const currentDate = timestampToDate(getCurrentTimestamp());
    const expirationDate = timestampToDate(payload?.exp || 0);

    if (currentDate > expirationDate) return true;
    return false;
  }
}

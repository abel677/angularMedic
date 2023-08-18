import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAppointmentsPayload } from '../interfaces';
import { environment } from 'src/environments/environment.development';
import { Observable, map } from 'rxjs';
import { AppointmentResponse } from '../interfaces/response';
import { IApiResponse } from '../interfaces/IAut';

@Injectable({
  providedIn: 'root',
})
export class AppointmentsService {
  constructor(private http: HttpClient) {}

  postAppointments(payload: IAppointmentsPayload): Observable<IApiResponse> {
    return this.http.post<IApiResponse>(
      `${environment.apiUrl}/appointment`,
      payload
    );
  }

  getAppointments(idPatient: number): Observable<AppointmentResponse[]> {
    return this.http.get<AppointmentResponse[]>(
      `${environment.apiUrl}/appointment/${idPatient}`
    );
  }

  resolveAppointment(id: number): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(
      `${environment.apiUrl}/resolveAppointment/${id}`
    );
  }
}

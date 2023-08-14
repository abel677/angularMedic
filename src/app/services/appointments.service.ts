import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAppointmentsPayload } from '../interfaces';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { AppointmentResponse } from '../interfaces/response';

@Injectable({
  providedIn: 'root',
})
export class AppointmentsService {
  constructor(private http: HttpClient) {}

  postAppointments(payload: IAppointmentsPayload) {
    console.log(payload);
    
    return this.http.post<any>(`${environment.apiUrl}/appointment`, payload);
  }

  getAppointments(idPatient: number): Observable<AppointmentResponse[]> {
    return this.http.get<AppointmentResponse[]>(
      `${environment.apiUrl}/appointment/${idPatient}`
    );
  }
}

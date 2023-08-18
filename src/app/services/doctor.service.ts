import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { IDoctor } from '../interfaces';
import { AppointmentResponse } from '../interfaces/response';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  constructor(private http: HttpClient) {}

  getDoctor(
    direction: string,
    idSpecialties: number,
    idSchedule: number
  ): Observable<IDoctor[]> {
    if (!direction) direction = '-1';
    return this.http.get<IDoctor[]>(
      `${environment.apiUrl}/doctor/${direction}/${idSpecialties}/${idSchedule}`
    );
  }

  getDoctorIdPerson(idPerson: number): Observable<IDoctor> {
    return this.http.get<IDoctor>(`${environment.apiUrl}/doctor/${idPerson}`);
  }

  getAppointmentPatient(idDoctor: number): Observable<AppointmentResponse[]> {
    return this.http.get<AppointmentResponse[]>(
      `${environment.apiUrl}/doctor/${idDoctor}/patients`
    );
  }
}

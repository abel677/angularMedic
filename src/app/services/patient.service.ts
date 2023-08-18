import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppointmentResponse } from '../interfaces/response';
import { environment } from 'src/environments/environment.development';
import { IPatient } from '../interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(private http: HttpClient) {}

  getPatientIdPerson(id: number): Observable<IPatient> {
    return this.http.get<IPatient>(
      `${environment.apiUrl}/patient/${id}`
    );
  }
}

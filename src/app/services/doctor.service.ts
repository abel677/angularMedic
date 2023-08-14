import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { IDoctor } from '../interfaces';

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
}

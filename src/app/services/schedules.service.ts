import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ISchedules } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class SchedulesService {
  constructor(private http: HttpClient) {}

  getSpecialties(): Observable<ISchedules[]> {
    return this.http.get<ISchedules[]>(`${environment.apiUrl}/schedules`);
  }
}

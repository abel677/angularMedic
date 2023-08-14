import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ISpecialty } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class SpecialtiesService {
  constructor(private http: HttpClient) {}

  getSpecialties(): Observable<ISpecialty[]> {
    return this.http.get<ISpecialty[]>(`${environment.apiUrl}/specialties`);
  }
}

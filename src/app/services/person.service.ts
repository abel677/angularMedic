import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPatient, IPerson } from '../interfaces';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { IApiResponse } from '../interfaces/IAut';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  constructor(private http: HttpClient) {}

  postPerson(person: IPerson): Observable<IApiResponse> {
    return this.http.post<IApiResponse>(
      `${environment.apiUrl}/persons`,
      person
    );
  }
  updatePerson(person: IPerson): Observable<IApiResponse> {
    return this.http.put<IApiResponse>(
      `${environment.apiUrl}/persons/${person.id}`,
      person
    );
  }

  getPersonIdUser(id: number): Observable<IPatient> {
    return this.http.get<IPatient>(`${environment.apiUrl}/persons/${id}`);
  }

  onPersonIdUser(id: number): Observable<IPerson> {
    return this.http.get<IPerson>(`${environment.apiUrl}/persons/${id}`);
  }
}

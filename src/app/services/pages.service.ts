import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { IPageResponse } from '../interfaces/IPageResponse';

@Injectable({
  providedIn: 'root',
})
export class PagesService {
  //constructor(private http: HttpClient) { }

  private http = inject(HttpClient);

  getPagesRoles(idRol: number): Observable<IPageResponse[]> {
    return this.http.get<IPageResponse[]>(
      `${environment.apiUrl}/pages/${idRol}`
    );
  }
}

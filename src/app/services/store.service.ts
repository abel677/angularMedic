import { Injectable } from '@angular/core';
import { IPatient, IPerson, IUser } from '../interfaces';
import { PersonService } from './person.service';
import { PatientService } from './patient.service';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(
    private personService: PersonService,
  ) {

  }

  user: IUser = {
    id: 0,
    name: '',
    email: '',
  };

 

  getUser() {
    const data = localStorage.getItem('user');
    if (data) {
      const result = JSON.parse(data);
      this.user = result;
    }
    return this.user;
  }
  onIsUser() {
    if (localStorage.getItem('user')) return true;
    return false;
  }



  onIsPerson() {
    const person = localStorage.getItem('person');
    if (person) return true;
    return false;
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPerson, IUser } from 'src/app/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { PersonService } from 'src/app/services/person.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user: IUser = {
    name: '',
    email: '',
  };
  person: IPerson[] = [];

  constructor(
    private authService: AuthService,
    private personService: PersonService,
    private store: StoreService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getUser();
    this.getPerson();
  }

  getUser() {
    if (this.store.onIsUser()) {
      this.user = this.store.getUser();
    }
  }
  getPerson() {
    this.personService.getPersonIdUser(this.user.id || 0).subscribe({
      next: (person) => {
        this.person = person;
        if (person.length > 0) {
          localStorage.setItem('person', JSON.stringify(person[0]));
        }
      },
    });
  }

  logout() {
    this.authService.logout().subscribe({
      next: (res) => {
        localStorage.clear();
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}

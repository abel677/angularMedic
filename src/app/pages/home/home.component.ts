import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPerson, IUser } from 'src/app/interfaces';
import { IAuthResponse, IRoles } from 'src/app/interfaces/IAut';
import { IPageResponse } from 'src/app/interfaces/IPageResponse';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { PagesService } from 'src/app/services/pages.service';
import { PersonService } from 'src/app/services/person.service';

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
  person?: IPerson;

  users: IAuthResponse = {
    user: {
      name: '',
      email: '',
    },
    jwt: '',
    roles: [],
    status: false,
    message: '',
  };

  pages: IPageResponse[] = [];
  roles: IRoles[] = [];

  constructor(
    private authService: AuthService,
    private personService: PersonService,
    private router: Router,
    private pagesServices: PagesService
  ) {}
  ngOnInit(): void {
    this.getUser();
    this.getPatient();
    this.getPerson();
    this.getRoles();
    this.getPages();
  }

  getRoles() {
    this.roles = this.authService.getRoles();
  }

  getPages() {
    this.pagesServices.getPagesRoles(this.roles[0].id).subscribe({
      next: (res) => {
        this.pages = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getUser() {
    if (this.authService.onIsUser()) {
      this.user = this.authService.getUserStorage();
      this.authService.getUser(this.user.id || 0).subscribe({
        next: (res) => {
          this.users = res;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
  getPatient() {
    this.personService.getPersonIdUser(this.user.id || 0).subscribe({
      next: (person) => {
        this.person = person;
        if (Object.keys(person).length > 0) {
          localStorage.setItem('person', JSON.stringify(person));
        }
      },
    });
  }
  getPerson() {
    this.personService.onPersonIdUser(this.user.id || 0).subscribe({
      next: (res) => {
        if (res.id) {
          localStorage.setItem('person', JSON.stringify(res));
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

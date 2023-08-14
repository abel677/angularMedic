import { Component } from '@angular/core';
import { IPerson } from 'src/app/interfaces';
import { AppointmentResponse } from 'src/app/interfaces/response';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  constructor(
    private appointmentsService: AppointmentsService,
    private authService: AuthService,
    private loaderService: LoaderService
  ) {}

  appointments: AppointmentResponse[] = [];
  isLoader = false;

  person: IPerson = {
    id: 0,
    name: '',
    lastName: '',
    birthDate: '',
    typeBlood: '',
    direction: '',
    email: '',
    phone: '',
    securityNumber: '',
    gender: '',
  };

  ngOnInit(): void {
    this.getPerson();
  }

  getPerson() {
    if (this.authService.getPerson().success) {
      this.person = this.authService.getPerson().person;
      if (this.person.id) {
        this.getAppointments(this.person.id);
      }
    }
  }

  getAppointments(idPerson: number): void {
    this.loaderService.IsSetLoader = true;
    this.appointmentsService.getAppointments(idPerson).subscribe({
      next: (res) => {
        this.appointments = res;
        this.loaderService.IsSetLoader = false;
      },
      error: (err) => {
        this.loaderService.IsSetLoader = false;
        console.log(err);
      },
    });
  }
}

import { Component } from '@angular/core';
import { IPatient, IPerson, IUser } from 'src/app/interfaces';
import { AppointmentResponse } from 'src/app/interfaces/response';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { PatientService } from 'src/app/services/patient.service';
import { PersonService } from 'src/app/services/person.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  constructor(
    private appointmentsService: AppointmentsService,
    private patientServices: PatientService,
    private personService: PersonService,
    private store: StoreService,
  ) {}

  appointments: AppointmentResponse[] = [];

  user?: IUser;
  person: IPerson[] = [];
  patient: IPatient[] = [];

  ngOnInit(): void {
    this.getUser();
    this.getPerson();
  }

  getUser() {
    this.user = this.store.getUser();
  }

  getPerson() {
    this.personService.getPersonIdUser(this.user?.id || 0).subscribe({
      next: (person) => {
        this.person = person;
        this.getPatient();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getPatient() {
    this.patientServices.getPatientIdPerson(this.person[0]?.id || 0).subscribe({
      next: (patient) => {
        this.patient = patient;
        this.getAppointments();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getAppointments(): void {
    this.appointmentsService
      .getAppointments(this.patient[0]?.id || 0)
      .subscribe({
        next: (res) => {
          this.appointments = res;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}

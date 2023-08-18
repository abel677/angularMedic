import { Component } from '@angular/core';
import { IPatient, IPerson, IUser } from 'src/app/interfaces';
import { IRoles } from 'src/app/interfaces/IAut';
import { AppointmentResponse } from 'src/app/interfaces/response';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { AuthService } from 'src/app/services/auth.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { LoaderService } from 'src/app/services/loader.service';
import { PatientService } from 'src/app/services/patient.service';
import { PersonService } from 'src/app/services/person.service';

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
    private authService: AuthService,
    private doctorService: DoctorService
  ) {}

  appointments: AppointmentResponse[] = [];

  user?: IUser;
  person?: IPerson;
  patient?: IPatient;
  roles: IRoles[] = [];

  ngOnInit(): void {
    this.getRoles();
    this.getUser();
    this.getPerson();
  }

  getRoles() {
    this.roles = this.authService.getRoles();
  }

  getUser() {
    this.user = this.authService.getUserStorage();
  }

  getPerson() {
    this.personService.onPersonIdUser(this.user?.id || 0).subscribe({
      next: (person) => {
        this.person = person;
        if (this.roles[0].role === 'patient') {
          this.getPatient();
        } else {
          this.getDoctor();
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getPatient() {
    this.patientServices.getPatientIdPerson(this.person?.id || 0).subscribe({
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
    if (this.roles[0].role === 'patient') {
      this.appointmentsService
        .getAppointments(this.patient?.id || 0)
        .subscribe({
          next: (res) => {
            this.appointments = res;
          },
          error: (err) => {
            console.log(err);
          },
        });
    } else {
      console.log('debe consultar las solicitudes de los pacientes');
    }
  }

  getDoctor() {
    this.doctorService.getDoctorIdPerson(this.person?.id || 0).subscribe({
      next: (res) => {
        console.log(res);

        this.getAppointmentPatient(res.id || 0);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getAppointmentPatient(idDoctor: number) {
    console.log(idDoctor);
    
    this.doctorService.getAppointmentPatient(idDoctor).subscribe({
      next: (res) => {
        this.appointments = res;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}

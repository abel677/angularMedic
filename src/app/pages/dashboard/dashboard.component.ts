import { Component } from '@angular/core';
import { IPatient, IPerson, IUser } from 'src/app/interfaces';
import { IApiResponse, IRoles } from 'src/app/interfaces/IAut';
import { AppointmentResponse } from 'src/app/interfaces/response';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { AuthService } from 'src/app/services/auth.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { PatientService } from 'src/app/services/patient.service';
import { PersonService } from 'src/app/services/person.service';
import Swal from 'sweetalert2';

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

  onCancelAppointment(idAppointment: number): void {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: `¿Está seguro de cancelar la esta cita?`,
      showConfirmButton: true,
      showCancelButton: true,
    }).then((r) => {
      if (r.isConfirmed) {
        this.appointmentsService.cancelAppointment(idAppointment).subscribe({
          next: (res: IApiResponse) => {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: res.message,
              showConfirmButton: true,
              timer: 1500,
            });

            this.getAppointments();
          },
        });
      }
    });
  }

  getRoles() {
    this.roles = this.authService.getRoles();
  }

  getUser() {
    this.user = this.authService.getUserStorage();
  }

  isPatient: boolean = false;
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
    }
  }

  getDoctor() {
    this.doctorService.getDoctorIdPerson(this.person?.id || 0).subscribe({
      next: (res) => {
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
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}

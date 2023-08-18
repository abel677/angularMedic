import { Component } from '@angular/core';
import { IPerson, IUser } from 'src/app/interfaces';
import { AppointmentResponse } from 'src/app/interfaces/response';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { AuthService } from 'src/app/services/auth.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { PersonService } from 'src/app/services/person.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-resolve-appointment',
  templateUrl: './resolve-appointment.component.html',
  styleUrls: ['./resolve-appointment.component.css'],
})
export class ResolveAppointmentComponent {
  constructor(
    private authService: AuthService,
    private personService: PersonService,
    private doctorService: DoctorService,
    private appointmentServices: AppointmentsService
  ) {}
  person?: IPerson;
  user?: IUser;
  appointments: AppointmentResponse[] = [];

  ngOnInit(): void {
    this.getUser();
    this.getPerson();
  }

  getUser() {
    this.user = this.authService.getUserStorage();
  }

  getPerson() {
    this.personService.onPersonIdUser(this.user?.id || 0).subscribe({
      next: (person) => {
        this.person = person;

        this.getDoctor();
      },
      error: (err) => {
        console.log(err);
      },
    });
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

  resolveAppointment(id: number) {
    this.appointmentServices.resolveAppointment(id).subscribe({
      next: (res) => {
        console.log(res);
        this.getPerson();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: res.message,
          showConfirmButton: false,
          timer: 1500,
        });
      },
      error: (err) => console.log(err),
    });
  }
}

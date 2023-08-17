import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ISchedules, ISpecialty } from 'src/app/interfaces';
import { IDoctor } from 'src/app/interfaces';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { GenderService } from 'src/app/services/gender.service';

import { LoaderService } from 'src/app/services/loader.service';
import { SchedulesService } from 'src/app/services/schedules.service';
import { SpecialtiesService } from 'src/app/services/specialties.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css'],
})
export class AppointmentsComponent implements OnInit, AfterViewInit {
  constructor(
    private cdRef: ChangeDetectorRef,
    private schedulesService: SchedulesService,
    private specialtyService: SpecialtiesService,
    private doctorService: DoctorService,
    private appointmentsService: AppointmentsService,
    private fb: FormBuilder,
    private router: Router,
  ) {}
  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }

  form: FormGroup = this.fb.group({
    patient_id: ['', [Validators.required]],
    doctor_id: ['', [Validators.required]],
    appointmentDate: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });

  schedules: ISchedules[] = [];
  specialties: ISpecialty[] = [];

  directionFilter: string = '';
  idSpecialties: number = -1;
  idSchedule: number = -1;

  doctors: IDoctor[] = [];
  doctorSelected?: IDoctor;

  ngOnInit(): void {
    this.getSpecialties();
    this.getSchedules();
  }

  getSpecialties(): void {
    this.specialtyService.getSpecialties().subscribe({
      next: (res) => {
        this.specialties = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getSchedules(): void {
    this.schedulesService.getSpecialties().subscribe({
      next: (res) => {
        this.schedules = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  onChangeSpecialty(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.idSpecialties = Number.parseInt(target.value);
  }
  onChangeSchedule(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.idSchedule = Number.parseInt(target.value);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      alert('Faltan campos requeridos');
      return;
    }
    this.appointmentsService.postAppointments(this.form.value).subscribe({
      next: (res) => {
        alert(res.message);
        this.form.reset();
        this.doctors = [];
        this.doctorSelected = undefined;
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  buscar(): void {
    this.doctorService
      .getDoctor(this.directionFilter, this.idSpecialties, this.idSchedule)
      .subscribe({
        next: (res) => {
          this.doctors = res;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  selectDoctor(doctor: IDoctor): void {
    this.doctorSelected = doctor;

    console.log(this.doctorSelected);

    this.form.controls['doctor_id'].setValue(this.doctorSelected?.doctor_id);
    this.form.controls['patient_id'].setValue(1);
  }
}

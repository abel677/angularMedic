import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Modal } from 'bootstrap';
import { IGender, IPatient, IPerson, IUser } from 'src/app/interfaces';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { GenderService } from 'src/app/services/gender.service';
import { PatientService } from 'src/app/services/patient.service';
import { PersonService } from 'src/app/services/person.service';
import Swal from 'sweetalert2';

declare let bootstrap: any;
@Component({
  selector: 'app-personal-contact',
  templateUrl: './personal-contact.component.html',
  styleUrls: ['./personal-contact.component.css'],
})
export class PersonalContactComponent implements OnInit {
  @ViewChild('modal') modal?: ElementRef<HTMLElement>;
  autService = inject(AuthService);
  genderService = inject(GenderService);
  personService = inject(PersonService);
  patientServices = inject(PatientService);
  alert = inject(AlertService);
  fb = inject(FormBuilder);
  genders: IGender[] = [];
  isEdit: boolean = false;

  formChangePassword: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'),
    ]),
    password: new FormControl('', Validators.required),
  });

  form: FormGroup = this.fb.group({
    id: [''],
    name: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    birthDate: ['', [Validators.required]],
    typeBlood: ['', [Validators.required]],
    direction: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    securityNumber: ['', [Validators.required]],
    idGender: ['', [Validators.required]],
    idUser: [''],
    idPatient: [''],
  });

  person?: IPerson;
  user?: IUser;
  patient?: IPatient;
  #modal?: Modal;

  onSubmitChangePassword(): void {
    if (this.formChangePassword.invalid) {
      this.formChangePassword.markAllAsTouched();
      return;
    }
    this.autService.changePassword(this.formChangePassword.value).subscribe({
      next: (res) => {
        this.#modal?.hide()
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: res.message,
          showConfirmButton: false,
          timer: 1500,
        });
      },
    });
  }

  getControl(name: string): FormControl {
    return this.formChangePassword.get(name) as FormControl;
  }

  initModal(): void {
    this.#modal = new bootstrap.Modal(this.modal?.nativeElement);
    this.#modal?.show();
  }

  closeModal(): void {
    this.#modal?.hide();
  }

  ngOnInit(): void {
    this.getUser();
    this.getPerson();
    this.getGender();
  }
  getUser() {
    this.user = this.autService.getUserStorage();
    this.form.controls['idUser'].setValue(this.user.id);
  }
  getPerson() {
    this.personService.getPersonIdUser(this.user?.id || 0).subscribe({
      next: (person) => {
        this.person = person;
        if (Object.keys(person).length > 0) {
          localStorage.setItem('person', JSON.stringify(person));
        }

        this.getPatient();

        this.form.patchValue(this.person);
        if (this.person?.id) {
          this.isEdit = true;
        } else {
          this.isEdit = false;
        }
      },
    });
  }

  getPatient() {
    this.patientServices.getPatientIdPerson(this.person?.id || 0).subscribe({
      next: (patient) => {
        this.patient = patient;
        this.form.controls['securityNumber'].setValue(
          this.patient.securityNumber
        );
        this.form.controls['idPatient'].setValue(this.patient.id);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getGender() {
    this.genderService.getGenders().subscribe((data) => (this.genders = data));
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.isEdit) {
        this.onEdit();
      } else {
        this.onRegister();
      }
    } else {
      this.form.markAllAsTouched();
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Completa todo los campos!',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  onRegister() {
    this.personService.postPerson(this.form.value).subscribe({
      next: (res) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: res.message,
          showConfirmButton: false,
          timer: 1500,
        });
      },
      error: (err) => {
        this.alert.Show();
        this.alert.setColor('text-bg-danger');
        this.alert.setMessage(err.message);
      },
    });
    this.getPerson();
  }

  onEdit() {
    this.personService.updatePerson(this.form.value).subscribe({
      next: (res) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: res.message,
          showConfirmButton: false,
          timer: 1500,
        });
      },
      error: (err) => {
        this.alert.Show();
        this.alert.setColor('text-bg-danger');
        this.alert.setMessage(err.message);
      },
    });
  }
}

import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Modal } from 'bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { PersonService } from 'src/app/services/person.service';
import Swal from 'sweetalert2';

declare let bootstrap: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  @ViewChild('modal') modal?: ElementRef<HTMLElement>;
  autService = inject(AuthService);

  isShowPassword: boolean = false;
  loader: boolean = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    public personService: PersonService
  ) {}

  #modal?: Modal;
  formChangePassword: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'),
    ]),
  });

  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  initModal(): void {
    this.#modal = new bootstrap.Modal(this.modal?.nativeElement);
    this.#modal?.show();
  }

  closeModal(): void {
    this.#modal?.hide();
  }

  onSubmitChangePassword(): void {
    if (this.formChangePassword.invalid) {
      this.formChangePassword.markAllAsTouched();
      return;
    }
    this.autService.changePassword(this.formChangePassword.value).subscribe({
      next: (res) => {
        this.#modal?.hide();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Exito!',
          text: res.message,
          showConfirmButton: false,
          timer: 3600,
        });
      },
    });
  }

  getControl(name: string): FormControl {
    return this.formChangePassword.get(name) as FormControl;
  }

  get emailField() {
    return this.form.get('email');
  }
  get passwordField() {
    return this.form.get('password');
  }

  setIsShowPassword() {
    this.isShowPassword = !this.isShowPassword;
  }

  onSubmit() {
    if (this.form.valid) {
      this.loader = true;
      this.authService.login(this.form.value).subscribe({
        next: (res) => {
          localStorage.setItem('token', res.jwt);
          localStorage.setItem('user', JSON.stringify(res.user));
          localStorage.setItem('roles', JSON.stringify(res.roles));

          this.loader = false;
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.loader = false;
        },
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}

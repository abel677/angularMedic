import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  isShowPassword: boolean = false;
  loader: boolean = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    public personService: PersonService
  ) {}

  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

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
          this.router.navigate(['/home']);
          this.loader = false;
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

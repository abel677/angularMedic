import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  isShowPassword: boolean = false;
  message: string = '';
  

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    public loader: LoaderService
  ) {}

  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.min(8)]],
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
    this.message = '';
    if (this.form.valid) {
      this.loader.IsSetLoader = true;
      this.authService.login(this.form.value).subscribe({
        next: (res) => {
          this.message = '';
          this.loader.IsSetLoader = false;
          localStorage.setItem('token', res.jwt);
          localStorage.setItem('user',JSON.stringify(res.user));
          localStorage.setItem('person',JSON.stringify(res.person));
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.message = 'Credenciales invalidas';
          this.loader.IsSetLoader = false;
          console.log(err);
          
        },
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}

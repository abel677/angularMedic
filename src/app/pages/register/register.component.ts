import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private loader: LoaderService
  ) {}
  isLoading$ = this.loader.isLoading$;

  form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  isShowPassword: boolean = false;
  message: string = '';
  color: string = '';

  get nameField() {
    return this.form.get('name');
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

  ngOnInit(): void {}

  onSubmit() {
    if (this.form.valid) {
      this.auth.register(this.form.value).subscribe({
        next: (res) => {
          console.log(res);

          this.message = res.message;
          this.color = 'alert-success';
          this.form.reset();
        },
        error: (err) => {
          this.message = err;
          this.color = 'alert-warning';
        },
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}

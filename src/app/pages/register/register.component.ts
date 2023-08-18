import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
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
    private loader: LoaderService,
    private alert: AlertService,
    private router: Router
  ) {}
  isLoading$ = this.loader.isLoading$;

  form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  isShowPassword: boolean = false;

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
          this.alert.Show();
          this.alert.setMessage(res.message);
          this.alert.setColor('text-bg-success');
          console.log(res);
          this.form.reset();
          this.router.navigateByUrl('/login');
        },
        error: (err) => {
          this.alert.Show();
          this.alert.setMessage(err.message);
          this.alert.setColor('text-bg-danger');
          console.log(err);
          
        },
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}

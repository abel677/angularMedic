import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user: IUser = {
    name: '',
    email: '',
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    public loader: LoaderService
  ) {}
  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.loader.IsSetLoader = true;
    if (this.authService.getUser().success) {
      this.user = this.authService.getUser().user;
      this.loader.IsSetLoader = false;
    }
  }

  logout() {
    this.loader.IsSetLoader = true;
    this.authService.logout().subscribe({
      next: (res) => {
        localStorage.clear();
        this.router.navigate(['/login']);
        this.loader.IsSetLoader = false;
      },
      error: (err) => {
        console.log(err);
        this.loader.IsSetLoader = false;
      },
    });
  }
}

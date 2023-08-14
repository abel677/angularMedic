import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AppointmentsComponent } from './pages/appointments/appointments.component';
import { isExpired } from './guard/isExpired';
import { isLogout } from './guard/isLogout';
import { isPatient } from './guard/isPatient';

const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [isLogout] },
  { path: 'login', component: LoginComponent, canActivate: [isLogout] },
  { path: 'register', component: RegisterComponent },

  {
    path: 'home', component: HomeComponent, canActivate: [isExpired],
    children: [
      { path: '', component: DashboardComponent, canActivate: [isExpired]},
      { path: 'appointments', component: AppointmentsComponent, canActivate:[ isExpired, isPatient ]}
      
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

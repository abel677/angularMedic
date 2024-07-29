import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { IUser } from '../interfaces';

export const isConfirmAccount: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userJSON = localStorage.getItem('user');

  if (!userJSON) {
    router.navigate(['/login']);
    localStorage.clear();
    return false;
  }

  const user = JSON.parse(userJSON) as IUser;

  if (!user.email_verified_at) {
    router.navigate(['/login']);
    localStorage.clear();
    return false;
  }

  return true;
};

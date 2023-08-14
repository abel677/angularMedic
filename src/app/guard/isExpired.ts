import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const isExpired: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const authService = inject(AuthService);
  

  if (authService.isExpiredSession()) {
    alert('La sesión ha expirado');
    router.navigate(['/login']);
    localStorage.clear();
    return false;
  }
  return true;
};

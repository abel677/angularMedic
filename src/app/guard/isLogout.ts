import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const isLogout: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const page = route.url[0]?.path;

  if (page === 'login') {
    localStorage.clear();
    return true;
  }else{
    router.navigate(['/home']);
    return false;
  }
};

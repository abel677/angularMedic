import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const isPatient: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const authService = inject(AuthService);
  const page = route.url[0]?.path;

  
  
  if (page === 'appointments') {
    
    if(authService.getPerson().success){

      return true;
    }
    alert('llenar los datos de contacto para poder continuar con la solicitud de citas')
    router.navigate(['/home']);
    return false
  }else{
    router.navigate(['/home']);
    return false;
  }
};

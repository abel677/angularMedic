import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { StoreService } from '../services/store.service';

export const isPatient: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const store = inject(StoreService);
  const page = route.url[0]?.path;

  
  
  if (page === 'appointments') {
    
    if(store.onIsPerson()){

      return true;
    }
    alert('Para poder agendar una cita, primero llene los datos del contacto.')
    router.navigate(['/home']);
    return false
  }else{
    router.navigate(['/home']);
    return false;
  }
};

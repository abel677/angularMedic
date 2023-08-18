import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

export const isPatient: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const autService = inject(AuthService);

  let page = route.url[0]?.path;

  if (page === 'appointments') {
    if (autService.onIsPerson()) {
      return true;
    }

    Swal.fire({
      text: "Complete su registro en la sección de contacto para agendar una cita!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Completar',
    }).then((result) => {
      if (result.isConfirmed) {
        router.navigate(['/home/personal/contact']);
      }
    });

    return false;
  } else {
    router.navigate(['/home']);
    return false;
  }
};

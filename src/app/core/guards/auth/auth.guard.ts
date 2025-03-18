import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const pLATFORM_ID = inject(PLATFORM_ID);
  const router = inject(Router);
  if (isPlatformBrowser(pLATFORM_ID)) {
    if (localStorage.getItem('user-token') !== null) {
      return true;
    } else {
      router.navigateByUrl('/auth/login');
      return false;
    }
  } else {
    return false;
  }
};

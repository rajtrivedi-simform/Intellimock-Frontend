import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/common/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  authService.isLoginCheck().subscribe((res: boolean) => {
    if (res) {
      return true;
    } else {
      router.navigateByUrl('/login');
      return false;
    }
  });
  return false; // Default Fallback Value
};

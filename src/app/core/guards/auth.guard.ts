import {CanActivateFn, Router} from '@angular/router';
import {UserAuthService} from "../services/user-auth.service";
import {inject} from "@angular/core";
import {map} from "rxjs";

export const authGuard: CanActivateFn = (route, state) => {
  const authService: UserAuthService = inject(UserAuthService)
  const router: Router = inject(Router)

  return authService.userData$.pipe(
    map((user: any) => {
      if(!user) {
        router.navigate(['/'])
      }
      return Boolean(user)
    })
  );
};

import { CanActivateFn } from '@angular/router';
import {UserAuthService} from "../services/user-auth.service";
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
  const authService: UserAuthService = inject(UserAuthService)

  return authService.isAuth;
};

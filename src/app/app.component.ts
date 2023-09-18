import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnChanges,
  OnDestroy,
  OnInit
} from '@angular/core';
import {UserAuthService} from "./core/services/user-auth.service";
import {Router} from "@angular/router";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnChanges {
  isAuth: boolean = false

  loginForm: any = {
    email: '',
    password: ''
  }

  constructor(
    public authService: UserAuthService,
    private router: Router,
    private ref: ChangeDetectorRef,
    private destroyRef: DestroyRef
  ) {
  }

  ngOnInit() {
    this.authService.userData$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(user => {
      if(user) {
        this.isAuth = true
        this.router.navigate(['/fbi'])
      } else {
        this.isAuth = false
        this.ref.markForCheck()
      }
    })
    // if (localStorage.getItem('user')) {
    //   this.isAuth = true
    //   this.router.navigate(['/fbi'])
    // } else {
    //   this.isAuth = false
    //   this.ref.markForCheck()
    // }
  }

  ngOnChanges() {
    if (this.authService.isAuth) {
      this.router.navigate(['/fbi'])
    }
  }

  signIn() {
    this.authService.signIn(this.loginForm.email, this.loginForm.password).subscribe(user => {
      if (user) {
        this.isAuth = true
        this.ref.markForCheck()
      }
    })
  }
}

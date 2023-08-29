import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnChanges, OnInit} from '@angular/core';
import {UserAuthService} from "../../../core/services/user-auth.service";
import {Router} from "@angular/router";

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
    private ref: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.authService.isAuthStatus$.subscribe(value => {
      if(value) {
        this.router.navigate(['/fbi'])
      } else {
        this.ref.markForCheck()
      }
    })
  }

  ngOnChanges() {
    if(this.authService.isAuth) {
      this.router.navigate(['/fbi'])
    }
  }

  signIn() {
    this.authService.signIn(this.loginForm.email, this.loginForm.password).then(user => {
      if(user) {
        if(this.authService.isAuth) {
          this.isAuth = true
        }
        this.ref.markForCheck()
      }
    })
  }


}

import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {UserAuthService} from "../../../core/services/user-auth.service";
import {user} from "@angular/fire/auth";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit{
  @Input() isAuth :boolean = false

  openModal: boolean = false

  email: string = ""
  password: string = ""

  constructor(
    public authService: UserAuthService,
    public ref: ChangeDetectorRef,
    private router: Router
    ) {
  }

  ngOnInit() {
    if(localStorage.getItem('user')) {
      this.isAuth = true
    }
  }

  setOpenModal(): void {
    this.openModal = !this.openModal
  }

  signIn() {
    this.authService.signIn(this.email, this.password).then(user => {
      if(user) {
        if(this.authService.isAuth) {
          this.isAuth = true
          console.log(this.isAuth, 'here')
        }
        this.openModal = false
        this.ref.markForCheck()
      }
    })
  }

  signOut() {
    this.authService.signOut()
    this.isAuth = false
    this.router.navigate([''])
  }
}

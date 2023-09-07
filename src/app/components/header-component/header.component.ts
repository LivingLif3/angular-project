import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {UserAuthService} from "../../../core/services/user-auth.service";
import {user} from "@angular/fire/auth";
import {Router} from "@angular/router";
import {ModalService} from "../../../core/services/modal.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy{
  @Input() isAuth :boolean = false

  email: string = ""
  password: string = ""

  constructor(
    public authService: UserAuthService,
    private router: Router,
    private modalService: ModalService,
    private ref: ChangeDetectorRef
    ) {
  }

  ngOnInit() {
    this.authService.userData$.subscribe((user) => {
      console.log(user, "DSADSADASD")
      if(user) {
        this.isAuth = true
        this.ref.markForCheck()
      } else {
        this.isAuth = false
      }
    })
  }

  openModal() {
    this.modalService.openAuthModal()
  }

  signOut() {
    this.authService.signOut()
    this.isAuth = false
    this.router.navigate([''])
  }

  ngOnDestroy() {
    this.authService.userData$.unsubscribe()
  }
}

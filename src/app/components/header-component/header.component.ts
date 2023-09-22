import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {UserAuthService} from "../../core/services/user-auth.service";
import {Router} from "@angular/router";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AuthModalComponent} from "../auth-modal/auth-modal.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit{
  @Input() isAuth :boolean = false

  email: string = ""
  password: string = ""
  authDialogRef!: MatDialogRef<AuthModalComponent>

  constructor(
    public authService: UserAuthService,
    private router: Router,
    public dialog: MatDialog,
    private ref: ChangeDetectorRef
    ) {
  }

  ngOnInit() {
    this.authService.userData$.subscribe((user) => {
      this.isAuth = Boolean(user)
      this.ref.markForCheck()
    })
  }

  openModal() {
    this.authDialogRef = this.dialog.open(AuthModalComponent)
  }

  signOut() {
    this.authService.signOut()
    this.isAuth = false
    this.router.navigate([''])
  }
}

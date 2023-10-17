import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Injectable, Optional} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserAuthService} from "../../core/services/user-auth.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {IUser} from "../../core/interfaces/IUser";

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthModalComponent {

  authForm: FormGroup = this.fb.group({
    email: [''],
    password: ['']
  })

  constructor(
    private fb: FormBuilder,
    private authService: UserAuthService,
    private ref: ChangeDetectorRef,
    public dialog: MatDialogRef<AuthModalComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  signIn() {
    this.getUserData().subscribe(
      (user: IUser) => {
        if (user) {
          this.dialog.close()
          this.ref.markForCheck()
        }
      })
  }


  getUserData() {
    return this.authService.signIn(this.authForm.get('email')?.value, this.authForm.get('password')?.value)
  }

}

import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserAuthService} from "../../../core/services/user-auth.service";
import {ModalService} from "../../../core/services/modal.service";

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
    private modalService: ModalService
  ) {
  }

  signIn() { // Изменить
    this.authService.signIn(this.authForm.get('email')?.value, this.authForm.get('password')?.value).subscribe(
      (user: any) => {
        if (user) {
          this.modalService.closeAuthModal()
          this.ref.markForCheck()
        }
      })
  }

}

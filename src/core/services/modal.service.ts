import {ElementRef, Injectable} from '@angular/core';
import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {AuthModalComponent} from "../../app/components/auth-modal/auth-modal.component";
import {EditPostModalComponent} from "../../app/modules/fbi-page/components/edit-post-modal/edit-post-modal.component";

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  authDialogRef!: MatDialogRef<any>
  editDialogRef!: MatDialogRef<any>

  constructor(
    public dialog: MatDialog
  ) {

  }

  openAuthModal() {
    this.authDialogRef = this.dialog.open(AuthModalComponent)
  }

  closeAuthModal() {
    this.authDialogRef.close()
  }

  openEditModal() {
    this.editDialogRef = this.dialog.open(EditPostModalComponent)
  }

  closeEditModal() {
    this.editDialogRef.close()
  }

}

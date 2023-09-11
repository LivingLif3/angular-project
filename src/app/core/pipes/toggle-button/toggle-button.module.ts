import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ToggleButtonPipe} from "./toggle-button.pipe";



@NgModule({
  declarations: [
    ToggleButtonPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ToggleButtonPipe
  ]
})
export class ToggleButtonModule { }

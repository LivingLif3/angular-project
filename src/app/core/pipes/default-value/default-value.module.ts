import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DefaultValuePipe} from "./default-value.pipe";



@NgModule({
  declarations: [
    DefaultValuePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DefaultValuePipe
  ]
})
export class DefaultValueModule { }

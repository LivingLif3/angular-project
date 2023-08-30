import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FbiPageComponent } from './components/fbi-page/fbi-page.component';
import {RouterModule, Routes} from "@angular/router";
import {authGuard} from "../../../core/guards/auth.guard";
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { FbiCardComponent } from './components/fbi-card/fbi-card.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CriminalInfoComponent } from './components/criminal-info/criminal-info.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {ToggleButtonPipe} from "../../../core/pipes/toggle-button.pipe";
import {ModalComponent} from "../../../core/components/modal/modal.component";

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from '@angular/material/icon';
import {DefaultValuePipe} from "../../../core/pipes/default-value.pipe";
import {GenderComponent} from "../../../core/components/gender/gender.component";
import { AddFieldComponent } from './components/add-field/add-field.component';
import {MatSelectModule} from '@angular/material/select';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AddedFieldInfoComponent } from './components/added-field-info/added-field-info.component';
import {TextHightlightDirective} from "../../../core/directives/text-hightlight.directive";

const routes: Routes = [
  {
    path: '',
    component: FbiPageComponent,
    canActivate: [authGuard]
  }
]

@NgModule({
  declarations: [
    FbiPageComponent,
    FbiCardComponent,
    CriminalInfoComponent,
    ToggleButtonPipe,
    DefaultValuePipe,
    AddFieldComponent,
    AddedFieldInfoComponent,
    TextHightlightDirective
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatPaginatorModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    ModalComponent,
    MatStepperModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    GenderComponent,
    MatSelectModule,
    FormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatCheckboxModule
  ]
})
export class FbiPageModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FbiPageComponent } from './fbi-page.component';
import {RouterModule, Routes} from "@angular/router";
import {authGuard} from "../../core/guards/auth.guard";
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { FbiCardComponent } from './components/fbi-card/fbi-card.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CriminalInfoComponent } from './components/criminal-info/criminal-info.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {ModalComponent} from "../../core/components/modal/modal.component";

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from '@angular/material/icon';
import {GenderComponent} from "../../core/components/gender/gender.component";
import { AddFieldComponent } from './components/add-field/add-field.component';
import {MatSelectModule} from '@angular/material/select';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AddedFieldInfoComponent } from './components/added-field-info/added-field-info.component';
import {TextHightlightDirective} from "../../core/directives/text-hightlight.directive";
import {DefaultValueModule} from "../../core/pipes/default-value/default-value.module";
import {ToggleButtonModule} from "../../core/pipes/toggle-button/toggle-button.module";
import { CriminalsContainerComponent } from './components/criminals-container/criminals-container.component';
import { EditedPostPageComponent } from './components/edited-post-page/edited-post-page.component';
import { OriginalPostsPageComponent } from './components/original-posts-page/original-posts-page.component';
import { EditPostModalComponent } from './components/edit-post-modal/edit-post-modal.component';
import { InfoFieldComponent } from './components/info-field/info-field.component';
import { CreateFieldComponent } from './components/create-field/create-field.component';
import { AddingFormComponent } from './components/adding-form/adding-form.component';
import { EditFieldComponent } from './components/edit-field/edit-field.component';
import { EditPostModalOriginalContainerComponent } from './components/edit-post-modal-original-container/edit-post-modal-original-container.component';
import { EditPostModalEditedContainerComponent } from './components/edit-post-modal-edited-container/edit-post-modal-edited-container.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'original',
    pathMatch: 'full'
  },
  {
    path: 'edited',
    component: EditedPostPageComponent,
    canActivate: [authGuard]
  },
  {
    path: 'original',
    component: OriginalPostsPageComponent,
    canActivate: [authGuard]
  }
]

@NgModule({
  declarations: [
    FbiPageComponent,
    FbiCardComponent,
    CriminalInfoComponent,
    AddFieldComponent,
    AddedFieldInfoComponent,
    TextHightlightDirective,
    CriminalsContainerComponent,
    EditedPostPageComponent,
    OriginalPostsPageComponent,
    EditPostModalComponent,
    InfoFieldComponent,
    CreateFieldComponent,
    AddingFormComponent,
    EditFieldComponent,
    EditPostModalOriginalContainerComponent,
    EditPostModalEditedContainerComponent
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
    MatCheckboxModule,
    DefaultValueModule,
    ToggleButtonModule
  ]
})
export class FbiPageModule { }

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
    CriminalInfoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatPaginatorModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatGridListModule
  ]
})
export class FbiPageModule { }

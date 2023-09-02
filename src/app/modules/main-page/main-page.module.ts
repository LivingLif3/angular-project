import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page.component';
import {RouterModule, Routes} from "@angular/router";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { UserCardComponent } from './components/user-card/user-card.component';
import {MatDividerModule} from '@angular/material/divider';
import {authGuard} from "../../../core/guards/auth.guard";
import {DefaultValueModule} from "../../../core/pipes/default-value/default-value.module";

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    canActivate: [authGuard]
  }
]

@NgModule({
  declarations: [
    MainPageComponent,
    UserCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatProgressSpinnerModule,
    MatDividerModule,
    DefaultValueModule
  ]
})
export class MainPageModule { }

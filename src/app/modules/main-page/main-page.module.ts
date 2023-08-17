import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './components/main-page/main-page.component';
import {RouterModule, Routes} from "@angular/router";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { UserCardComponent } from './components/user-card/user-card.component';
import {MatDividerModule} from '@angular/material/divider';
import {authGuard} from "../../../core/guards/auth.guard";

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
    MatDividerModule
  ]
})
export class MainPageModule { }

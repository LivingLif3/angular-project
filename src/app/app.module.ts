import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './components/app-component/app.component';
import {HeaderComponent} from './components/header-component/header.component';
import {CommonModule} from "@angular/common";
import {SidebarComponent} from './components/sidebar/sidebar.component';
import { RouterModule, RouterOutlet, Routes} from "@angular/router";
import {ModalComponent} from "../core/components/modal/modal.component";
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {FIREBASE_OPTIONS} from "@angular/fire/compat";
import {authGuard} from "../core/guards/auth.guard";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {MatIconModule} from '@angular/material/icon';

let routes: Routes = [
  {
    path: 'main',
    loadChildren: () => import('./modules/main-page/main-page.module')
      .then(value => value.MainPageModule),
    canLoad: [authGuard]
  },
  {
    path: 'fbi',
    loadChildren: () => import('./modules/fbi-page/fbi-page.module')
      .then(value => value.FbiPageModule),
    canLoad: [authGuard]
  }
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterOutlet,
    ModalComponent,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    AngularFireAuthModule,
    RouterModule.forRoot(routes),
    MatIconModule
  ],
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase } // НУЖНО ПРОВАЙДИТЬ ТОКЕН, Т.К. ВЫКИДЫВАЕТ ОШИБКУ БЕЗ ЭТОГО
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

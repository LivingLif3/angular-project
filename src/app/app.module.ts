import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header-component/header.component';
import {CommonModule} from "@angular/common";
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {Router, RouterModule, RouterOutlet, Routes} from "@angular/router";
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
import {HttpClientModule} from "@angular/common/http";
import {UserAuthService} from "../core/services/user-auth.service";

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

function initializeApplication(authService: UserAuthService, router: Router) {
    return () => authService.checkAuth().subscribe((user) => {
      if(user) {
        let userDataTemp: any = user.multiFactor.user
        localStorage.setItem('user', JSON.stringify(userDataTemp))
        JSON.parse(localStorage.getItem('user')!)
        authService.userData$.next(userDataTemp)
        router.navigate(['/fbi'])
      } else {
        localStorage.removeItem('user')
        JSON.parse(localStorage.getItem('user')!)
        authService.userData$.next(null)
      }
    })
}

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
    MatIconModule,
    HttpClientModule
  ],
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase }, // НУЖНО ПРОВАЙДИТЬ ТОКЕН, Т.К. ВЫКИДЫВАЕТ ОШИБКУ БЕЗ ЭТОГО
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApplication,
      deps: [UserAuthService, Router],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

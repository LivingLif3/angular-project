import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UserAuthService} from "../../core/services/user-auth.service";
import {concatMap, finalize, map, switchMap, tap} from "rxjs";
import {IUserData} from "../../core/interfaces/user-interface";
import {user} from "@angular/fire/auth";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent implements OnInit {

  loading: boolean = false
  userData!: any

  constructor(
    public authService: UserAuthService,
    private ref: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.loading = true

    this.authService.getAuthUser().pipe(
      switchMap((user) => {
        return this.authService.getUserRenderData().pipe(
          map((users: any) => users.find((u: any) => u['email'] === user?.email))
        )
      })
    ).subscribe((userData: any) => {
      this.userData = userData
      this.loading = false
      this.ref.markForCheck()
    })

  }

}

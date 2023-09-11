import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UserAuthService} from "../../core/services/user-auth.service";
import {concatMap, finalize} from "rxjs";
import {IUserData} from "../../core/interfaces/user-interface";

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

    let userData: any = null

    this.authService.getAuthUser().pipe(
      concatMap((user) => {
        userData = user
        return this.authService.getUserRenderData()
      })
    ).subscribe(users => {
      this.userData = users.find(user => user['email'] === userData.email)
      this.loading = false
      this.ref.markForCheck()
    })

    // this.authService.getAuthUser().subscribe((user: any) => {
    //   let userInfo = user.multiFactor.user
    //   this.authService.getUserRenderData().subscribe(users => {
    //     this.userData = users.find(user => user['email'] === userInfo.email)
    //     this.loading = false
    //     this.ref.markForCheck()
    //   })
    // })


    // this.authService.getUserRenderData().pipe(
    //   finalize(() => {
    //     this.userData = this.authService.renderUserData
    //     this.changeDetection.markForCheck()
    //   })
    // ).subscribe(v => {
    // })

  }

}

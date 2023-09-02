import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UserAuthService} from "../../../core/services/user-auth.service";
import {finalize} from "rxjs";
import {IUserData} from "../../../core/interfaces/user-interface";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent implements OnInit{

  loadingData: boolean = false
  userData!: IUserData

  constructor(
    public authService: UserAuthService,
    private changeDetection: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.authService.getUserRenderData().pipe(
      finalize(() => {
        this.userData = this.authService.renderUserData
        this.changeDetection.markForCheck()
      })
    ).subscribe(v => {
      this.loadingData = v //Сетить узер дату
    })
  }

}

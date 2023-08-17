import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UserAuthService} from "../../../../../core/services/user-auth.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent implements OnInit{

  constructor(
    public authService: UserAuthService,
    private changeDetection: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.authService.getUserRenderData()
    this.changeDetection.markForCheck()
    console.log(this.authService.loadingUserData, "DADS")
  }

}

import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FbiService} from "../../../../../core/services/fbi.service";

@Component({
  selector: 'app-fbi-page',
  templateUrl: './fbi-page.component.html',
  styleUrls: ['./fbi-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FbiPageComponent implements OnInit{

  showEditedPosts: boolean = false

  chosenElement: number = 0
  showAdditionalInfo: boolean = false

  loading: boolean = true

  list: number = 1
  criminals: any = []

  page: number = 0
  itemsPerPage: number = 4
  sliceOfCriminals: any = []

  constructor(
    private fbiService: FbiService,
    private changeDetectionRef: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.fbiService.getPeopleByPage(this.list).subscribe(v => {
      this.loading = false
      this.criminals = v.items
      this.sliceOfCriminals = this.criminals.slice(0, 4)
      this.changeDetectionRef.markForCheck()
    })
  }

  onPaginateChange(event: any) {
    this.page = event.pageIndex
    this.sliceOfCriminals = this.criminals.slice(this.page*this.itemsPerPage, (this.page + 1)*this.itemsPerPage)
    console.log(this.sliceOfCriminals)
  }

  loadMore() {
    this.loading = true
    this.list += 1
    this.fbiService.getPeopleByPage(this.list).subscribe(v => {
      this.loading = false
      console.log(v.items)
      this.criminals.push(...v.items)
      this.changeDetectionRef.markForCheck()
    })
  }

  showInfo() {
    this.showAdditionalInfo = true
  }

  hideInfo() {
    this.showAdditionalInfo = false
  }

  changePosts() {
    this.fbiService.getEditedPosts()
  }
}

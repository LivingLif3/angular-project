import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FbiService} from "../../../../../core/services/fbi.service";
import {ChooseElementService} from "../../../../../core/services/choose-element.service";

@Component({
  selector: 'app-edited-post-page',
  templateUrl: './edited-post-page.component.html',
  styleUrls: ['./edited-post-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditedPostPageComponent implements OnInit {

  loading: boolean = false
  editedPosts: any = []
  showAdditionalInfo: boolean = false

  // Additional info fields

  editedCriminal: any = {}

  // Paginator

  pageIndex: number = 0
  length: number = 0
  itemsPerPage: number = 20

  showedEditedPosts: any = []

  constructor(
    public fbiService: FbiService,
    private ref: ChangeDetectorRef,
    private chooseElementService: ChooseElementService
  ) {
  }

  ngOnInit() {
    this.loading = true
    this.fbiService.getEditedPosts().subscribe((editedPosts) => {
      this.editedPosts = editedPosts
      this.fbiService.editedPosts = this.editedPosts
      this.length = editedPosts.length
      this.showedEditedPosts = this.changeShowedCriminals()

      this.loading = false
      this.ref.markForCheck()
    })

    this.chooseElementService.editedCriminalData$.subscribe(editedCriminal => {
      this.editedCriminal = editedCriminal
    })
  }

  showInfo() {
    this.showAdditionalInfo = true
  }

  hideInfo() {
    this.showAdditionalInfo = false
  }

  // Additional info

  choose() {
    this.chooseElementService.chooseElement(this.editedCriminal)
    this.ref.markForCheck()
  }

  // Paginator methods

  onPaginateChange(event: any) {
    this.pageIndex = event.pageIndex
    this.showedEditedPosts = this.changeShowedCriminals()
    this.ref.markForCheck()
  }

  changeShowedCriminals() {
    return this.editedPosts.slice(this.pageIndex * this.itemsPerPage, (this.pageIndex + 1) * this.itemsPerPage)
  }

}

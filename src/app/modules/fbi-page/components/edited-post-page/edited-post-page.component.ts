import {ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnDestroy, OnInit} from '@angular/core';
import {FbiService} from "../../../../core/services/fbi.service";
import {ChooseElementService} from "../../../../core/services/choose-element.service";
import {first, take} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-edited-post-page',
  templateUrl: './edited-post-page.component.html',
  styleUrls: ['./edited-post-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditedPostPageComponent implements OnInit {

  loading: boolean = false
  showAdditionalInfo: boolean = false

  // Additional info fields

  editedCriminal: any = null

  // Paginator

  pageIndex: number = 0
  length: number = 0
  itemsPerPage: number = 4

  showedEditedPosts: any = []

  constructor(
    public fbiService: FbiService,
    private ref: ChangeDetectorRef,
    private chooseElementService: ChooseElementService,
    private destroyRef: DestroyRef
  ) {
  }

  ngOnInit() {


    this.loading = true

    this.chooseElementService.editedCriminalData$.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(editedCriminal => {
      console.log()
      this.editedCriminal = editedCriminal
    })

    this.fbiService.getEditedPosts(this.pageIndex, this.itemsPerPage).pipe(first()).subscribe((editedPosts) => {
      this.length = this.fbiService.editedPosts.length
      this.showedEditedPosts = editedPosts
      if(!this.editedCriminal) {
        console.log("JK")
        this.chooseElementService.editedCriminalData$.next(editedPosts[0])
      }

      this.loading = false
      this.ref.markForCheck()
    })
  }

  showInfo() {
    this.showAdditionalInfo = true
  }

  hideInfo() {
    this.showAdditionalInfo = false
  }

  // Paginator methods

  onPaginateChange(event: any) {
    this.pageIndex = event.pageIndex
    this.loading = true
    this.fbiService.getEditedPosts(this.pageIndex, this.itemsPerPage).pipe(first()).subscribe((editedPosts) => {
      this.showedEditedPosts = editedPosts
      this.loading = false
      this.ref.markForCheck()
    })
  }

}

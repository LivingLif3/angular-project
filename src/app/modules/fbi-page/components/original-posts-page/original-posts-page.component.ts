import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, DestroyRef,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {FbiService} from "../../../../core/services/fbi.service";
import {ChooseElementService} from "../../../../core/services/choose-element.service";
import {AdditionalFieldsService} from "../../../../core/services/additional-fields.service";
import {finalize, forkJoin, map, mergeMap, switchMap, take, tap} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MatDialogRef} from "@angular/material/dialog";
import {EditPostModalComponent} from "../edit-post-modal/edit-post-modal.component";
import {ICriminalInfo} from "../../../../core/interfaces/criminal-info";

@Component({
  selector: 'app-original-posts-page',
  templateUrl: './original-posts-page.component.html',
  styleUrls: ['./original-posts-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OriginalPostsPageComponent implements OnInit {

  loading: boolean = false
  showAdditionalInfo: boolean = false

  // Paginator fields

  @ViewChild('paginator', {read: ElementRef})
  paginator!: ElementRef

  showedCriminals: ICriminalInfo[] = []

  length: number = 0
  pageIndex: number = 0
  itemsPerPage: number = 20

  // Additional information fields

  chosenCriminal: ICriminalInfo = this.fbiService.criminals[0]

  constructor(
    public fbiService: FbiService,
    private fb: FormBuilder,
    private ref: ChangeDetectorRef,
    private chooseElementService: ChooseElementService,
    private destroyRef: DestroyRef
  ) {
  }

  ngOnInit() {
    this.loading = true

    forkJoin({
      editedPosts: this.fbiService.getEditedPosts(0,4).pipe(take(1)),
      people: this.fbiService.getPeople()
    }).subscribe(({editedPosts, people}) => {
      this.showedCriminals = people.items
      this.fbiService.criminals = people.items

      this.length = people.total
      this.loading = false
      this.ref.markForCheck()
    })

    this.chooseElementService.criminalData$.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(criminal => {
      this.chosenCriminal = criminal
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
    this.loading = true
    this.getPeopleByPage(event.pageIndex).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((newCriminals: any) => {
      this.fbiService.criminals = newCriminals.items
      this.showedCriminals = newCriminals.items
      this.loading = false
      this.ref.markForCheck()
    })
  }

  getPeopleByPage(pageIndex: number = 0) {
    return this.fbiService.getPeopleByPage(pageIndex + 1)
  }

}

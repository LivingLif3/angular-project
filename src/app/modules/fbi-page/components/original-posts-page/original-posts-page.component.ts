import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {FbiService} from "../../../../core/services/fbi.service";
import {ChooseElementService} from "../../../../core/services/choose-element.service";
import {AdditionalFieldsService} from "../../../../core/services/additional-fields.service";
import {finalize, map, mergeMap, switchMap, take, tap} from "rxjs";

@Component({
  selector: 'app-original-posts-page',
  templateUrl: './original-posts-page.component.html',
  styleUrls: ['./original-posts-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OriginalPostsPageComponent implements OnInit, OnDestroy {

  loading: boolean = false
  showAdditionalInfo: boolean = false

  // Paginator fields

  @ViewChild('paginator', {read: ElementRef})
  paginator!: ElementRef

  showedCriminals: any = []

  length: number = 0
  pageIndex: number = 0
  itemsPerPage: number = 20

  // Additional information fields

  chosenCriminal: any = this.fbiService.criminals[0]

  constructor(
    public fbiService: FbiService,
    private fb: FormBuilder,
    private ref: ChangeDetectorRef,
    private chooseElementService: ChooseElementService
  ) {
  }

  ngOnInit() {
    this.loading = true

    // this.fbiService.getEditedPosts().pipe(
    //   map(editedPosts => {
    //     this.fbiService.editedPosts = editedPosts
    //   }),
    //   mergeMap(() => this.fbiService.getPeople())
    // ).subscribe((criminals) => {
    //   this.showedCriminals = criminals.items
    //   this.fbiService.criminals = criminals.items
    //
    //   this.length = criminals.total
    //   this.loading = false
    //   this.ref.markForCheck()
    // })

    this.fbiService.getEditedPosts().pipe(
      tap((editedPosts: any) => {
        this.fbiService.editedPosts = editedPosts
      }),
      switchMap(() => this.fbiService.getPeople())
    ).subscribe((criminals: any) => {
        this.showedCriminals = criminals.items
        this.fbiService.criminals = criminals.items

        this.length = criminals.total
        this.loading = false
        this.ref.markForCheck()
    })

    this.chooseElementService.criminalData$.subscribe(criminal => {
      console.log(criminal, 'INSIDE criminalData$ subscribe')
      this.chosenCriminal = criminal
    })
  }

  showInfo() {
    this.showAdditionalInfo = true
  }

  hideInfo() {
    this.showAdditionalInfo = false
  }

  // Additional info methods

  choose() {
    console.log(this.chosenCriminal, 'IN CHOOSE')
    this.chooseElementService.chooseElement(this.chosenCriminal)
    this.ref.markForCheck()
  }

  onCardChange(criminal: any): void {
    console.log(criminal, "NIKITA NAHLA YEBAK")
    this.chosenCriminal = criminal
  }

  // Paginator methods

  onPaginateChange(event: any) {
    this.loading = true
    this.fbiService.getPeopleByPage(event.pageIndex + 1).subscribe((newCriminals: any) => {
      this.fbiService.criminals = newCriminals.items
      this.showedCriminals = newCriminals.items
      this.loading = false
      this.ref.markForCheck()
    })
  }

  ngOnDestroy() {
    this.chooseElementService.criminalData$.unsubscribe()
  }

}

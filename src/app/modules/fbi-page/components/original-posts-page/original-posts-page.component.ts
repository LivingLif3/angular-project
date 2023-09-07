import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {FbiService} from "../../../../../core/services/fbi.service";
import {ChooseElementService} from "../../../../../core/services/choose-element.service";
import {AdditionalFieldsService} from "../../../../../core/services/additional-fields.service";
import {finalize, map, mergeMap, take} from "rxjs";

@Component({
  selector: 'app-original-posts-page',
  templateUrl: './original-posts-page.component.html',
  styleUrls: ['./original-posts-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OriginalPostsPageComponent implements OnInit {

  loading: boolean = false
  showAdditionalInfo: boolean = false
  criminals: any = []

  // Paginator fields

  @ViewChild('paginator', {read: ElementRef})
  paginator!: ElementRef

  showedCriminals: any = []

  length: number = 0
  pageIndex: number = 0
  itemsPerPage: number = 20

  // Additional information fields

  chosenCriminal: any = this.fbiService.criminals[0]

  // Edit Modal fields

  isOpen: boolean = false

  constructor(
    public fbiService: FbiService,
    private fb: FormBuilder,
    private ref: ChangeDetectorRef,
    private chooseElementService: ChooseElementService
  ) {
  }

  ngOnInit() {
    this.loading = true

    this.fbiService.getEditedPosts().pipe(
      map(editedPosts => {
        this.fbiService.editedPosts = editedPosts
      }),
      mergeMap(() => this.fbiService.getPeople())
    ).subscribe((criminals) => {
      this.criminals = criminals.items
      this.showedCriminals = this.criminals
      this.fbiService.criminals = this.criminals

      this.length = criminals.total
      this.loading = false
      this.ref.markForCheck()
    })

    // this.fbiService.getEditedPosts().pipe( // Исправить вложенные подписки
    //   take(1),
    //   finalize(() => {
    //     console.log("DSADOQJPGQPQPOPj")
    //     this.fbiService.getPeople().subscribe((criminals: any) => {
    //       this.criminals = criminals.items
    //       this.showedCriminals = this.criminals
    //       this.fbiService.criminals = this.criminals
    //
    //       this.length = criminals.total
    //       this.loading = false
    //       this.ref.markForCheck()
    //     })
    //   })
    // ).subscribe((editedPosts) => {
    //   this.fbiService.editedPosts = editedPosts
    //   this.loading = false
    // })


    this.chooseElementService.criminalData$.subscribe(criminal => {
      console.log(criminal, "CRIMINALLL")
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
    this.chooseElementService.chooseElement(this.chosenCriminal)
    this.ref.markForCheck()
  }

  onCardChange(criminal: any): void {
    this.chosenCriminal = criminal
  }

  // Paginator methods

  onPaginateChange(event: any) {
    this.pageIndex = event.pageIndex
    if (!this.hasNextPage()) {
      this.loading = true
      this.fbiService.getPeopleByPage(this.pageIndex + 1).subscribe((newCriminals: any) => {
        this.criminals = [...this.criminals, ...newCriminals.items]
        this.fbiService.criminals = this.criminals
        this.showedCriminals = this.changeShowedCriminals()

        this.loading = false
        this.ref.markForCheck()
      })
    } else {
      this.showedCriminals = this.changeShowedCriminals()
      this.ref.markForCheck()
    }
  }

  changeShowedCriminals() {
    return this.criminals.slice(this.pageIndex * this.itemsPerPage, (this.pageIndex + 1) * this.itemsPerPage)
  }

  hasNextPage(): boolean {
    return this.pageIndex <= Math.ceil(this.criminals.length / this.itemsPerPage) - 1;
  }

}

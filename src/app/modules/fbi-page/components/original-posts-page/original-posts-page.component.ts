import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {FbiService} from "../../../../../core/services/fbi.service";
import {ChooseElementService} from "../../../../../core/services/choose-element.service";
import {AdditionalFieldsService} from "../../../../../core/services/additional-fields.service";
import {finalize, take} from "rxjs";

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
  chosenElement: number = 0

  // Paginator fields

  @ViewChild('paginator', { read: ElementRef })
  paginator!: ElementRef

  showedCriminals: any = []

  length: number = 0
  pageIndex: number = 0
  itemsPerPage: number = 20

  // Edit Modal fields

  isOpen: boolean = false

  editFormGroup = this.fb.group({ // camelCase
    title: [''],
    age_range: [''],
    sex: [''],
    weight: [''],
    race_raw: [''],
    nationality: [''],
    hair_raw: [''],
    eyes: [''],
    reward_text: [''],
    description: ['']
  })

  constructor(
    public fbiService: FbiService,
    public fieldsService: AdditionalFieldsService,
    private fb: FormBuilder,
    private ref: ChangeDetectorRef,
    private chooseElementService: ChooseElementService
  ) {
  }

  ngOnInit() {
    this.loading = true
    this.chosenElement = this.chooseElementService.chosenElement
    this.fbiService.getEditedPosts().pipe(
      take(1),
      finalize(() => {
        console.log("DSADOQJPGQPQPOPj")
        this.fbiService.getPeople().subscribe((criminals: any) => {
          this.criminals = criminals.items
          this.showedCriminals = this.criminals
          this.fbiService.criminals = this.criminals

          this.length = criminals.total
          this.loading = false
          this.ref.markForCheck()
        })
      })
    ).subscribe((editedPosts) => {
      this.fbiService.editedPosts = editedPosts
      this.loading = false
    })
  }

  showInfo() {
    this.showAdditionalInfo = true
  }

  hideInfo() {
    this.showAdditionalInfo = false
  }

  chooseElement(elementIndex: number) {
    this.chosenElement = this.chooseElementService.chooseElement(elementIndex, this.pageIndex, this.itemsPerPage)
  }

  // Modal methods

  open() {
    console.log("HERE")
    console.log(this.isOpen, 'BEFORE SET')
    this.isOpen = true
    console.log(this.isOpen)
  }

  edit() {
    let data = {...this.criminals[this.chosenElement]}

    for (let key in this.editFormGroup.controls) {
      if (this.editFormGroup.get(key)?.value) {
        data[key] = this.editFormGroup.get(key)?.value
      }
    }
    if(Object.keys(this.fieldsService.additionalFields).length) {
      data.added_fields = this.fieldsService.additionalFields
    } else {
      data.added_fields = null
    }
    this.fbiService.addEditedPost(data)
  }

  // Paginator methods

  onPaginateChange(event: any) {
    this.pageIndex = event.pageIndex
    if(!this.hasNextPage()) {
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

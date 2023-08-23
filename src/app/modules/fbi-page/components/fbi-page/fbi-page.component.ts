import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FbiService} from "../../../../../core/services/fbi.service";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-fbi-page',
  templateUrl: './fbi-page.component.html',
  styleUrls: ['./fbi-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FbiPageComponent implements OnInit {

  showModal: boolean = false

  showEditedPosts: boolean = false
  editedPosts: any = []

  chosenElement: number = 0
  chosenEditedElement: number = 0
  chosenEditedElementId: string = ''

  showAdditionalInfo: boolean = false

  loading: boolean = true

  list: number = 1
  criminals: any = []

  page: number = 0
  editedPage: number = 0

  itemsPerPage: number = 4
  sliceOfCriminals: any = []

  editFormGroup = this._formBuilder.group({
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
    private fbiService: FbiService,
    private changeDetectionRef: ChangeDetectorRef,
    private _formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.fbiService.getEditedPosts().subscribe((v) => {
      if(!v) {
        this.editedPosts = this.fbiService.editedPosts
        this.updateEditStatus()
        this.changeDetectionRef.markForCheck()
      }
    })
    this.fbiService.getPeopleByPage(this.list).subscribe(v => {
      this.loading = false
      this.criminals = v.items
      this.sliceOfCriminals = this.criminals.slice(0, 4)
      this.updateEditStatus()
      this.changeDetectionRef.markForCheck()
    })
  }

  onPaginateChange(event?: any) {
    if (this.showEditedPosts) {
      this.editedPage = event.pageIndex
    } else {
      this.page = event.pageIndex
    }
    this.sliceOfCriminals = this.criminals.slice(this.page * this.itemsPerPage, (this.page + 1) * this.itemsPerPage)
  }

  loadMore() {
    this.loading = true
    this.list += 1
    this.fbiService.getPeopleByPage(this.list).subscribe(v => {
      this.loading = false
      this.criminals.push(...v.items)
      this.updateEditStatus()
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
    this.showEditedPosts = !this.showEditedPosts
    if (this.showEditedPosts) {
      this.fbiService.getEditedPosts().subscribe(v => {
        if (!v) {
          this.editedPosts = this.fbiService.editedPosts
          this.sliceOfCriminals = this.editedPosts.slice(this.editedPage * this.itemsPerPage, (this.editedPage + 1) * this.itemsPerPage)
          this.updateChosenEditedElement()
          this.changeDetectionRef.markForCheck()
        }
        this.loading = v
      })
    } else {
      this.sliceOfCriminals = this.criminals.slice(this.page * this.itemsPerPage, (this.page + 1) * this.itemsPerPage)
      this.updateEditStatus()
      this.changeDetectionRef.markForCheck()
    }
  }

  updateEditStatus() {
    for (let i = 0; i < this.editedPosts.length; i++) {
      let index = this.criminals.findIndex((el: any) => el['@id'] === this.editedPosts[i]['@id'])
      if (index !== -1) {
        this.criminals[index].edit = true
      }
    }
  }

  async edit() {
    console.log(this.editFormGroup)
    let data = {...this.criminals[this.chosenElement]}
    for (let key in this.editFormGroup.controls) {
      if (this.editFormGroup.get(key)?.value) {
        data[key] = this.editFormGroup.get(key)?.value
      }
    }
  }

  updateChosenEditedElement() {
    let index = this.editedPosts.findIndex((el: any) => el['@id'] === this.chosenEditedElementId)
    if(index !== -1) {
      this.chosenEditedElement = index
    }
  }


}

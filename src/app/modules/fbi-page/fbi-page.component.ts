import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FbiService} from "../../../core/services/fbi.service";
import {FormBuilder} from "@angular/forms";
import {AdditionalFieldsService} from "../../../core/services/additional-fields.service";
import {DefaultValuePipe} from "../../../core/pipes/default-value/default-value.pipe";

@Component({
  selector: 'app-fbi-page',
  templateUrl: './fbi-page.component.html',
  styleUrls: ['./fbi-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FbiPageComponent implements OnInit {

  filtredAgeValue: string = ''

  showEditedPosts: boolean = false

  showModal: boolean = false

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

  additionalFieldInfo = {
    key: "",
    value: "",
    type: "string"
  }

  editFormGroup = this._formBuilder.group({ // camelCase
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
    private _formBuilder: FormBuilder, //убрать подчёркивание
    public fieldsService: AdditionalFieldsService
  ) {
  }

  ngOnInit() { // Сделать отдельную страницу с edited posts
    this.fbiService.getEditedPosts().subscribe((v) => {
      console.log(v, "EDITED POSTS")
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

  onPaginateChange(event?: any) { // Сделать метод принимающий номер страницы, getPosts
    // getPosts(page: number){
    // .....subscribe(() => this.posts = ....)
    // }
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
    this.loading = true
    this.showEditedPosts = !this.showEditedPosts
    if (this.showEditedPosts) {
      this.fbiService.getEditedPosts().subscribe(editedPosts => {
        this.editedPosts = editedPosts
        this.sliceOfCriminals = this.editedPosts.slice(this.editedPage * this.itemsPerPage, (this.editedPage + 1) * this.itemsPerPage)
        this.updateChosenEditedElement()
        this.loading = false
        this.changeDetectionRef.markForCheck()
      })
    } else {
      this.sliceOfCriminals = this.criminals.slice(this.page * this.itemsPerPage, (this.page + 1) * this.itemsPerPage)
      this.updateEditStatus()
      this.loading = false
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

  edit() {
    console.log(this.editFormGroup)
    let data = {...this.criminals[this.chosenElement]}
    for (let key in this.editFormGroup.controls) { // Сделать через редьюсы
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

  updateChosenEditedElement() {
    let index = this.editedPosts.findIndex((el: any) => el['@id'] === this.chosenEditedElementId)
    if(index !== -1) {
      this.chosenEditedElement = index
    }
  }

  filterNumericInput(event: any) {
    const filteredValue = event.target.value.replace(/[^0-9]/g, '');
    this.editFormGroup.get('age_range')!.setValue(filteredValue, { emitEvent: false });
  }

}

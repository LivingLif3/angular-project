import {Directive, ElementRef, HostBinding, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[appTextHightlight]'
})
export class TextHightlightDirective implements OnInit {

  @Input() type!: string

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    if(this.type === 'string' || this.type === 'date') {
      this.elementRef.nativeElement.style.color = '#32CD32'
    } else if(this.type === 'number') {
      this.elementRef.nativeElement.style.color = 'black'
    } else {
      this.elementRef.nativeElement.style.color = '#1E90FF'
    }
  }

  // @HostBinding('style.color') get typeFont() {
  //   if(this.type === 'string' || this.type === 'date') {
  //     return '#32CD32'
  //   } else if(this.type === 'number') {
  //     return 'black'
  //   } else {
  //     return '#1E90FF'
  //   }
  // }
}

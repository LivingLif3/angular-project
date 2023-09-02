import {Directive, ElementRef, HostBinding, Input, OnInit, Renderer2} from '@angular/core';
import {types} from "../interfaces/color-types";

@Directive({
  selector: '[appTextHightlight]'
})

export class TextHightlightDirective implements OnInit {

  colors: Record<types, string> = {
    'string': '#32CD32',
    'date': '#32CD32',
    'number': '#000000',
    'boolean': '#1E90FF'
  }

  @Input() type!: types

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    console.log(this.type)
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'color',
      this.colors[this.type]
    )
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

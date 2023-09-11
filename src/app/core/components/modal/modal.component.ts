import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent implements OnChanges {

  @Input() isOpen: boolean = false

  @Input() color?: string

  @Output() isOpenChange = new EventEmitter()

  ngOnChanges() {
    console.log(this.isOpen, "CHANGES MODAL")
  }

  setIsOpen(): void {
    this.isOpenChange.emit(!this.isOpen)
    console.log(this.isOpen, "MODAL")
  }

  onContentClick(event: any): void {
    event.stopPropagation()
  }
}

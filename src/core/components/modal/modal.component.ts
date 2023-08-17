import {ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent {

  @Input() isOpen: boolean = false

  @Output() isOpenChange = new EventEmitter()

  setIsOpen(): void {
    this.isOpenChange.emit(!this.isOpen)
  }

  onContentClick(event: any): void {
    event.stopPropagation()
  }
}

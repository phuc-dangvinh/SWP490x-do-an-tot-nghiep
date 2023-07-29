import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-select-file',
  templateUrl: './select-file.component.html',
  styleUrls: ['./select-file.component.scss'],
})
export class SelectFileComponent {
  @Output() onClick: EventEmitter<void> = new EventEmitter<void>();
  public processClick() {
    this.onClick.emit();
  }
}

import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-new-large-button',
  templateUrl: './new-large-button.component.html',
  styleUrls: ['./new-large-button.component.scss'],
})
export class NewLargeButtonComponent {
  @Output() clickButton = new EventEmitter<boolean>();

  public onClick() {
    this.clickButton.emit(true);
  }
}

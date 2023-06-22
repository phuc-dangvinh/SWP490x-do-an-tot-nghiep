import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-button-base',
  templateUrl: './button-base.component.html',
  styleUrls: ['./button-base.component.scss'],
})
export class ButtonBaseComponent {
  @Output() clickButton = new EventEmitter<boolean>();

  public onClick() {
    this.clickButton.emit(true);
  }
}

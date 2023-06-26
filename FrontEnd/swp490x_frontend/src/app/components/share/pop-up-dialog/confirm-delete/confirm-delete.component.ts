import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BUTTON } from '../../../../const/EButton';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss'],
})
export class ConfirmDeleteComponent {
  @Output() clickCancelButton = new EventEmitter<boolean>();
  @Output() clickOkButton = new EventEmitter<boolean>();
  public readonly BUTTON = BUTTON;

  public onClick(button: BUTTON) {
    switch (button) {
      case BUTTON.CANCEL:
        this.clickCancelButton.emit(true);
        break;
      case BUTTON.OK:
        this.clickOkButton.emit(true);
        break;
      default:
    }
  }
}

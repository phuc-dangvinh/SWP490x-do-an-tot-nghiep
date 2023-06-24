import { Component, EventEmitter, Output } from '@angular/core';
import { ButtonBaseComponent } from '../button-base/button-base.component';

@Component({
  selector: 'app-new-large-button',
  templateUrl: './new-large-button.component.html',
  styleUrls: ['./new-large-button.component.scss'],
})
export class NewLargeButtonComponent extends ButtonBaseComponent {
}

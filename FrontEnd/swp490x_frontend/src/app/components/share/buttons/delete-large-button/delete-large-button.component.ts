import { Component, Input } from '@angular/core';
import { ButtonBaseComponent } from '../button-base/button-base.component';

@Component({
  selector: 'app-delete-large-button',
  templateUrl: './delete-large-button.component.html',
  styleUrls: ['./delete-large-button.component.scss'],
})
export class DeleteLargeButtonComponent extends ButtonBaseComponent {
  @Input() isDisable: boolean = false;
}

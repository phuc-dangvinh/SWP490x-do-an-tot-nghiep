import { Component, Input } from '@angular/core';
import { ButtonBaseComponent } from '../button-base/button-base.component';

@Component({
  selector: 'app-continue-button',
  templateUrl: './continue-button.component.html',
  styleUrls: ['./continue-button.component.scss'],
})
export class ContinueButtonComponent extends ButtonBaseComponent {
  @Input() textButton: string = 'Continue';
}

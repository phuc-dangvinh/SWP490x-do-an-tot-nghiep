import { Component, Input } from '@angular/core';
import { ButtonBaseComponent } from '../button-base/button-base.component';

@Component({
  selector: 'app-register-large-button',
  templateUrl: './register-large-button.component.html',
  styleUrls: ['./register-large-button.component.scss'],
})
export class RegisterLargeButtonComponent extends ButtonBaseComponent {
  @Input() width: number = 100;
}

import { Component, Input } from '@angular/core';
import { ButtonBaseComponent } from '../button-base/button-base.component';

@Component({
  selector: 'app-sign-in-button',
  templateUrl: './sign-in-button.component.html',
  styleUrls: ['./sign-in-button.component.scss'],
})
export class SignInButtonComponent extends ButtonBaseComponent {
  @Input() width: number = 100;
}

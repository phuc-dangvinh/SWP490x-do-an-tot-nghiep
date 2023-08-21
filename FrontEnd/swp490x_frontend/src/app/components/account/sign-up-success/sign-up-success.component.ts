import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EContentPopupSuccess } from 'src/app/interface/content-popup-success.enum';

@Component({
  selector: 'app-sign-up-success',
  templateUrl: './sign-up-success.component.html',
  styleUrls: ['./sign-up-success.component.scss'],
})
export class SignUpSuccessComponent {
  @Input() content: EContentPopupSuccess = EContentPopupSuccess.SIGN_UP_SUCCES;
  @Output() onClickButton: EventEmitter<void> = new EventEmitter<void>();
  public readonly contentPopupSuccess = EContentPopupSuccess;

  public handleClick() {
    this.onClickButton.emit();
  }
}

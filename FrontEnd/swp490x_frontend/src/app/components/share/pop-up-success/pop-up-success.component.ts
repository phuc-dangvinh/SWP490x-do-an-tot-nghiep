import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EContentPopupSuccess } from 'src/app/interface/content-popup-success.enum';

@Component({
  selector: 'app-pop-up-success',
  templateUrl: './pop-up-success.component.html',
  styleUrls: ['./pop-up-success.component.scss'],
})
export class PopUpSuccessComponent {
  @Input() content: EContentPopupSuccess = EContentPopupSuccess.SIGN_UP_SUCCES;
  @Input() textButton: string = 'Continue';
  @Output() onClickButton: EventEmitter<void> = new EventEmitter<void>();
  public readonly contentPopupSuccess = EContentPopupSuccess;

  public handleClick() {
    this.onClickButton.emit();
  }
}

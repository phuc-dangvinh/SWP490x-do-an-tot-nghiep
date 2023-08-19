import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sign-up-success',
  templateUrl: './sign-up-success.component.html',
  styleUrls: ['./sign-up-success.component.scss'],
})
export class SignUpSuccessComponent {
  @Output() onClickButton: EventEmitter<void> = new EventEmitter<void>();

  public handleClick() {
    this.onClickButton.emit();
  }
}

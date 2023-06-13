import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PopupPosition } from 'src/app/model/position-popup';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss'],
})
export class PopUpComponent implements OnInit {
  private static lastZIndex = 1;
  public zIndex = 0;
  @Input() position: PopupPosition = PopupPosition.CENTER;
  @Input() show: boolean = false;
  @Input() stopPropagation?: boolean = false;
  @Input() transparent?: boolean = false;
  // @Input() specificWidth?: number;
  // @Input() widthInPercent?: number;
  // @Input() bigSize? = false;
  @Output() closePopup = new EventEmitter<boolean>();

  // public constructor() {
  //   this.zIndex = 10000 + PopUpComponent.lastZIndex * 100;
  //   PopUpComponent.lastZIndex++;
  // }
  ngOnInit(): void {
    this.zIndex = 10000 + PopUpComponent.lastZIndex * 100;
    PopUpComponent.lastZIndex++;
  }

  public selectClass() {
    switch (this.position) {
      case PopupPosition.FULL_SCREEN:
        return 'modal-position-full-screen';
        break;
      case PopupPosition.CENTER:
        return 'modal-position-center';
        break;
      case PopupPosition.RIGHT:
        return 'modal-position-right';
        break;
      default:
        return '';
    }
  }

  public onClose(e: Event) {
    this.closePopup.emit(false);
    this.show = false;
    if (this.stopPropagation) {
      e.stopPropagation();
    }
  }

  public onClickModal(e: Event): void {
    if (this.stopPropagation) {
      e.stopPropagation();
    }
  }
}

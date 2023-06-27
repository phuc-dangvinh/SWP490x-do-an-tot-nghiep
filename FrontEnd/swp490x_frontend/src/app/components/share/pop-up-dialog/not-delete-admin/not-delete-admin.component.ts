import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';

@Component({
  selector: 'app-not-delete-admin',
  templateUrl: './not-delete-admin.component.html',
  styleUrls: ['./not-delete-admin.component.scss'],
})
export class NotDeleteAdminComponent {
  @Output() clickButton = new EventEmitter<boolean>();

  public onClick() {
    this.clickButton.emit(true);
  }
}

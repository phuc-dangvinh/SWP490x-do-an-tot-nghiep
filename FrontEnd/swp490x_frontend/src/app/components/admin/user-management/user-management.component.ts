import { Component } from '@angular/core';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent {
  public showPopup: boolean = false;

  public openPopup() {
    this.showPopup = true;
  }

  public closePopup() {
    this.showPopup = false;
  }
}

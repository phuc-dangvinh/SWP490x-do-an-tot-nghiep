import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.scss'],
})
export class CategoryManagementComponent {
  public items: MenuItem[] = [
    { label: 'menu 1' },
    { label: 'menu 2' },
    { label: 'menu 3' },
  ];
  public newName: string = '';
  public showInputNew: boolean = true;
  // public positionButtonIcon: ButtonIconPosition;
}

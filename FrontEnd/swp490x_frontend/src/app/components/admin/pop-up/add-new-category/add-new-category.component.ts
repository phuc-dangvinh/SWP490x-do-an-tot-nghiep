import { Component } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-add-new-category',
  templateUrl: './add-new-category.component.html',
  styleUrls: ['./add-new-category.component.scss'],
})
export class AddNewCategoryComponent {
  constructor(public ref: DynamicDialogRef) {}
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderButtonComponent } from './slider-button/slider-button.component';
import { NewLargeButtonComponent } from './new-large-button/new-large-button.component';
import { DeleteLargeButtonComponent } from './delete-large-button/delete-large-button.component';
import { EditButtonComponent } from './edit-button/edit-button.component';
import { DeleteButtonComponent } from './delete-button/delete-button.component';
import { CheckBoxButtonComponent } from './check-box-button/check-box-button.component';
import { SaveButtonComponent } from './save-button/save-button.component';
import { CancelButtonComponent } from './cancel-button/cancel-button.component';

@NgModule({
  declarations: [
    SliderButtonComponent,
    NewLargeButtonComponent,
    DeleteLargeButtonComponent,
    EditButtonComponent,
    DeleteButtonComponent,
    CheckBoxButtonComponent,
    SaveButtonComponent,
    CancelButtonComponent,
  ],
  imports: [CommonModule],
  exports: [
    CommonModule,
    SliderButtonComponent,
    NewLargeButtonComponent,
    DeleteLargeButtonComponent,
    EditButtonComponent,
    DeleteButtonComponent,
    CheckBoxButtonComponent,
    SaveButtonComponent,
    CancelButtonComponent,
  ],
})
export class ButtonsModule {}

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
import { SearchBoxComponent } from './search-box/search-box.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonBaseComponent } from './button-base/button-base.component';
import { ResetButtonComponent } from './reset-button/reset-button.component';
import { SelectFileComponent } from './select-file/select-file.component';
import { RegisterLargeButtonComponent } from './register-large-button/register-large-button.component';
import { ContinueButtonComponent } from './continue-button/continue-button.component';
import { SignInButtonComponent } from './sign-in-button/sign-in-button.component';

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
    SearchBoxComponent,
    ButtonBaseComponent,
    ResetButtonComponent,
    SelectFileComponent,
    RegisterLargeButtonComponent,
    ContinueButtonComponent,
    SignInButtonComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
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
    SearchBoxComponent,
    ResetButtonComponent,
    SelectFileComponent,
    RegisterLargeButtonComponent,
    ContinueButtonComponent,
    SignInButtonComponent
  ],
})
export class ButtonsModule {}

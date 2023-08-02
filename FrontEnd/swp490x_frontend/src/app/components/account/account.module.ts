import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { FormControlComponent } from '../share/form-control/form-control.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from '../share/buttons/buttons.module';
import { FileUploadComponent } from '../share/file-upload/file-upload.component';

@NgModule({
  declarations: [
    SignUpComponent,
    SignInComponent,
    FormControlComponent,
    FileUploadComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ButtonsModule],
})
export class AccountModule {}

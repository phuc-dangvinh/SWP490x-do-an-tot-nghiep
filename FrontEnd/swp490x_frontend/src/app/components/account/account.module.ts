import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { FormControlComponent } from '../share/form-control/form-control.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from '../share/buttons/buttons.module';
import { FileUploadComponent } from '../share/file-upload/file-upload.component';
import { SignUpSuccessComponent } from './sign-up-success/sign-up-success.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@NgModule({
  declarations: [
    SignUpComponent,
    SignInComponent,
    FormControlComponent,
    FileUploadComponent,
    SignUpSuccessComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonsModule,
    NgbModule,
    AppRoutingModule
  ],
})
export class AccountModule {}

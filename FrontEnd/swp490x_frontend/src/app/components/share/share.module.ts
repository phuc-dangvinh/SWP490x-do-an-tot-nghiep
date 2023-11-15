import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonBaseComponent } from './buttons/button-base/button-base.component';
import { CancelButtonComponent } from './buttons/cancel-button/cancel-button.component';
import { CheckBoxButtonComponent } from './buttons/check-box-button/check-box-button.component';
import { ContinueButtonComponent } from './buttons/continue-button/continue-button.component';
import { DeleteButtonComponent } from './buttons/delete-button/delete-button.component';
import { DeleteLargeButtonComponent } from './buttons/delete-large-button/delete-large-button.component';
import { EditButtonComponent } from './buttons/edit-button/edit-button.component';
import { NewLargeButtonComponent } from './buttons/new-large-button/new-large-button.component';
import { RegisterLargeButtonComponent } from './buttons/register-large-button/register-large-button.component';
import { ResetButtonComponent } from './buttons/reset-button/reset-button.component';
import { SaveButtonComponent } from './buttons/save-button/save-button.component';
import { SearchBoxComponent } from './buttons/search-box/search-box.component';
import { SelectFileComponent } from './buttons/select-file/select-file.component';
import { SignInButtonComponent } from './buttons/sign-in-button/sign-in-button.component';
import { SliderButtonComponent } from './buttons/slider-button/slider-button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { ConfirmDeleteComponent } from './pop-up-dialog/confirm-delete/confirm-delete.component';
import { NotDeleteAdminComponent } from './pop-up-dialog/not-delete-admin/not-delete-admin.component';
import { FormControlComponent } from './form-control/form-control.component';
import { PaginationComponent } from './pagination/pagination.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchProductComponent } from './search-product/search-product.component';
import { CategoryComponent } from './category/category.component';
import { AddEditCategoryComponent } from './category/add-edit-category/add-edit-category.component';
import { PopUpSuccessComponent } from './pop-up-success/pop-up-success.component';

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
    FileUploadComponent,
    ConfirmDeleteComponent,
    NotDeleteAdminComponent,
    FormControlComponent,
    PaginationComponent,
    SearchProductComponent,
    CategoryComponent,
    AddEditCategoryComponent,
    PopUpSuccessComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbModule],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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
    FileUploadComponent,
    ConfirmDeleteComponent,
    NotDeleteAdminComponent,
    FormControlComponent,
    PaginationComponent,
    SearchProductComponent,
    CategoryComponent,
    AddEditCategoryComponent,
    PopUpSuccessComponent,
  ],
})
export class ShareModule {}

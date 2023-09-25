import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementComponent } from './user-management/user-management.component';
import { ProductManagementComponent } from './product-management/product-management.component';
import { UserDetailComponent } from './pop-up/user-detail/user-detail.component';
import { ButtonsModule } from '../share/buttons/buttons.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDeleteComponent } from '../share/pop-up-dialog/confirm-delete/confirm-delete.component';
import { NotDeleteAdminComponent } from '../share/pop-up-dialog/not-delete-admin/not-delete-admin.component';
import { AddNewCategoryComponent } from './pop-up/add-new-category/add-new-category.component';
import { CategoryComponent } from './product-management/category/category.component';
import { FormControlComponent } from '../share/form-control/form-control.component';

@NgModule({
  declarations: [
    UserManagementComponent,
    ProductManagementComponent,
    UserDetailComponent,
    ConfirmDeleteComponent,
    NotDeleteAdminComponent,
    AddNewCategoryComponent,
    CategoryComponent,
    FormControlComponent
  ],
  imports: [
    CommonModule,
    ButtonsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
})
export class AdminModule {}

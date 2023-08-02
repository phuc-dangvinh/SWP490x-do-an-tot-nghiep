import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementComponent } from './user-management/user-management.component';
import { ProductManagementComponent } from './product-management/product-management.component';
import { CategoryManagementComponent } from './category-management/category-management.component';
import { UserDetailComponent } from './pop-up/user-detail/user-detail.component';
import { PopUpComponent } from '../share/pop-up/pop-up.component';
import { ButtonsModule } from '../share/buttons/buttons.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDeleteComponent } from '../share/pop-up-dialog/confirm-delete/confirm-delete.component';
import { ToastComponent } from '../share/toast/toast.component';
import { NotDeleteAdminComponent } from '../share/pop-up-dialog/not-delete-admin/not-delete-admin.component';

@NgModule({
  declarations: [
    UserManagementComponent,
    ProductManagementComponent,
    CategoryManagementComponent,
    UserDetailComponent,
    PopUpComponent,
    ConfirmDeleteComponent,
    ToastComponent,
    NotDeleteAdminComponent
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

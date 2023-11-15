import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementComponent } from './user-management/user-management.component';
import { ProductManagementComponent } from './product-management/product-management.component';
import { UserDetailComponent } from './pop-up/user-detail/user-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShareModule } from '../share/share.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { AddEditProductComponent } from './pop-up/add-edit-product/add-edit-product.component';

@NgModule({
  declarations: [
    UserManagementComponent,
    ProductManagementComponent,
    UserDetailComponent,
    AddEditProductComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ShareModule,
    NgSelectModule
  ],
})
export class AdminModule {}

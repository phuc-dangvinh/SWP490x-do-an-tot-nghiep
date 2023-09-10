import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementComponent } from './user-management/user-management.component';
import { ProductManagementComponent } from './product-management/product-management.component';
import { CategoryManagementComponent } from './category-management/category-management.component';
import { UserDetailComponent } from './pop-up/user-detail/user-detail.component';
import { ButtonsModule } from '../share/buttons/buttons.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDeleteComponent } from '../share/pop-up-dialog/confirm-delete/confirm-delete.component';
import { NotDeleteAdminComponent } from '../share/pop-up-dialog/not-delete-admin/not-delete-admin.component';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [
    UserManagementComponent,
    ProductManagementComponent,
    CategoryManagementComponent,
    UserDetailComponent,
    ConfirmDeleteComponent,
    NotDeleteAdminComponent
  ],
  imports: [
    CommonModule,
    ButtonsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MenuModule,
    ButtonModule,
    InputTextModule
  ],
})
export class AdminModule {}

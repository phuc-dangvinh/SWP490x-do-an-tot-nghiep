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
import { ConfirmDeleteComponent } from '../share/confirm-delete/confirm-delete.component';

@NgModule({
  declarations: [
    UserManagementComponent,
    ProductManagementComponent,
    CategoryManagementComponent,
    UserDetailComponent,
    PopUpComponent,
    ConfirmDeleteComponent
  ],
  imports: [
    CommonModule,
    ButtonsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
})
export class AdminModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementComponent } from './user-management/user-management.component';
import { ProductManagementComponent } from './product-management/product-management.component';
import { CategoryManagementComponent } from './category-management/category-management.component';
import { PagingComponent } from '../share/paging/paging.component';
import { UserDetailComponent } from './pop-up/user-detail/user-detail.component';
import { PopUpComponent } from '../share/pop-up/pop-up.component';
import { ButtonsModule } from '../share/buttons/buttons.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UserManagementComponent,
    ProductManagementComponent,
    CategoryManagementComponent,
    PagingComponent,
    UserDetailComponent,
    PopUpComponent,
  ],
  imports: [
    CommonModule,
    ButtonsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    // BrowserModule,
  ],
})
export class AdminModule {}

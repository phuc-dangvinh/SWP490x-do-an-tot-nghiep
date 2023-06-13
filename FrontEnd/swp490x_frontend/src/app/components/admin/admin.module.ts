import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementComponent } from './user-management/user-management.component';
import { ProductManagementComponent } from './product-management/product-management.component';
import { CategoryManagementComponent } from './category-management/category-management.component';
import { PagingComponent } from '../share/paging/paging.component';
import { UserDetailComponent } from './pop-up/user-detail/user-detail.component';
import { PopUpComponent } from '../share/pop-up/pop-up.component';
import { ButtonsModule } from '../share/buttons/buttons.module';
// import { ButtonsModule } from '../share/buttons/buttons.module';

@NgModule({
  declarations: [
    UserManagementComponent,
    ProductManagementComponent,
    CategoryManagementComponent,
    PagingComponent,
    UserDetailComponent,
    PopUpComponent,
    // SliderButtonComponent
  ],
  imports: [CommonModule, ButtonsModule],
})
export class AdminModule {}

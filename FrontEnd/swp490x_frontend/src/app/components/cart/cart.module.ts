import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartManagementComponent } from './cart-management/cart-management.component';
import { ShareModule } from '../share/share.module';

@NgModule({
  declarations: [CartManagementComponent],
  imports: [CommonModule, ShareModule],
})
export class CartModule {}

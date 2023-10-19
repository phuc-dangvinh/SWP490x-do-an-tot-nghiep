import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartManagementComponent } from './cart-management/cart-management.component';
import { ShareModule } from '../share/share.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CartManagementComponent],
  imports: [CommonModule, ShareModule, FormsModule, ReactiveFormsModule],
})
export class CartModule {}

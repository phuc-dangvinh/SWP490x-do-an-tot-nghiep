import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ProductCellComponent } from './components/product-cell/product-cell.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ShareModule } from '../share/share.module';



@NgModule({
  declarations: [
    HomeComponent,
    ProductCellComponent,
    ProductDetailComponent
  ],
  imports: [
    CommonModule,
    ShareModule
  ]
})
export class HomeModule { }

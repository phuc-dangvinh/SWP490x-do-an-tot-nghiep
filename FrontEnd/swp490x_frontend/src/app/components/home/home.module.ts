import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ProductCellComponent } from './components/product-cell/product-cell.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ShareModule } from '../share/share.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [HomeComponent, ProductCellComponent, ProductDetailComponent],
  imports: [CommonModule, ShareModule, AppRoutingModule, NgbModule],
})
export class HomeModule {}

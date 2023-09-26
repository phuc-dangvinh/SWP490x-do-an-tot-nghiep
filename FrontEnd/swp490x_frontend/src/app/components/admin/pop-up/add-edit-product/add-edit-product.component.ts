import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Category } from 'src/app/interface/category.interface';
import { Product } from 'src/app/interface/product.interface';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss'],
})
export class AddEditProductComponent implements OnInit, OnDestroy {
  @Input() isEdit: boolean = false;
  @Input() productEdit!: Product;
  @Input() listCategories: Category[] = [];

  ngOnInit(): void {
    console.log('init AddEditProductComponent');
    this.productEdit = {
      id: '5853cec4-1729-4fcb-af66-c72ab0cf39af',
      name: 'Up in Arms',
      price: 14575965,
      description: 'Major Chemicals',
      image: 'http://dummyimage.com/219x100.png/ff4444/ffffff',
      category: { id: '', name: 'Drywall & Acoustical (FED)' },
    };
  }
  ngOnDestroy(): void {
    console.log('destroy AddEditProductComponent');
  }
}

import { Component, Input } from '@angular/core';
import { rootApi } from 'src/app/enviroments/environment';
import { Product } from 'src/app/interface/product.interface';

@Component({
  selector: 'app-product-cell',
  templateUrl: './product-cell.component.html',
  styleUrls: ['./product-cell.component.scss'],
})
export class ProductCellComponent {
  @Input() product!: Product;
  public rootApiRequest = rootApi;
}

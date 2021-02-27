import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Model/product.model';
import { ProductOperations } from 'src/app/services/product-operations.service';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css'],
})
export class ProductlistComponent implements OnInit {
  constructor(private productOperations: ProductOperations) {}
  products: Array<Product>;
  ngOnInit(): void {
    this.productOperations.getProducts().subscribe((result) => {
      if (result.length > 0) this.products = result;
    });
  }
}

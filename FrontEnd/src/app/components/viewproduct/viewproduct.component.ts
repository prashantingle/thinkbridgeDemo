import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/Model/product.model';
import { ProductOperations } from 'src/app/services/product-operations.service';

@Component({
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.css'],
})
export class ViewproductComponent implements OnInit {
  prod: Product;

  constructor(
    private productOperations: ProductOperations,

    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.prod = new Product();
    this.prod.image = '';
    this.productOperations.getProduct(+id).subscribe((result) => {
      this.prod = result;
      this.prod.id = +id;
    });
  }
}

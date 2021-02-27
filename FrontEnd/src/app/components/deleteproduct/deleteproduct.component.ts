import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/Model/product.model';
import { ProductOperations } from 'src/app/services/product-operations.service';

@Component({
  selector: 'app-deleteproduct',
  templateUrl: './deleteproduct.component.html',
  styleUrls: ['./deleteproduct.component.css'],
})
export class DeleteproductComponent implements OnInit {
  prod: Product;
  constructor(
    private productOperations: ProductOperations,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.productOperations.getProduct(+id).subscribe((result) => {
      this.prod = result;
    });
  }

  onSubmit() {
    this.deleteProduct();
  }

  deleteProduct() {
    let id = this.route.snapshot.paramMap.get('id');
    this.productOperations.deleteProduct(+id).subscribe((result) => {
      this.router.navigateByUrl('/list');
    });
  }
}

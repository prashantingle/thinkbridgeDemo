import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Model/product.model';
import { ProductOperations } from 'src/app/services/product-operations.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css'],
})
export class AddproductComponent implements OnInit {
  prod: Product;
  prodForm: FormGroup;
  submitted: boolean;
  constructor(
    private productOperations: ProductOperations,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.prod = new Product();
    this.prod.image = '';

    this.prodForm = this.formBuilder.group({
      name: ['', Validators.required],
      desc: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  get f() {
    return this.prodForm.controls;
  }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.prodForm.invalid || this.prodForm.hasError('notSame')) {
      return;
    }
    this.saveProduct();
  }
  saveProduct() {
    this.productOperations.addProduct(this.prod).subscribe((result) => {
      this.router.navigateByUrl('/list');
    });
  }
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.prod.image = event.target.result.toString();
      };
    }
  }
}

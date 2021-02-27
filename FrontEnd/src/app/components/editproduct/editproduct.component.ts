import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/Model/product.model';
import { ProductOperations } from 'src/app/services/product-operations.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css'],
})
export class EditproductComponent implements OnInit {
  prod: Product;
  prodForm: FormGroup;
  submitted: boolean;
  constructor(
    private productOperations: ProductOperations,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.prod = new Product();
    this.prod.image = '';
    this.productOperations.getProduct(+id).subscribe((result) => {
      this.prod = result;
      this.prod.id = +id;
    });

    //this.prod = new Product();

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
    this.productOperations.udateProduct(this.prod).subscribe();
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

import { Injectable } from '@angular/core';
import { Product } from '../Model/product.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ProductlistComponent } from '../components/productlist/productlist.component';

@Injectable({
  providedIn: 'root',
})
export class ProductOperations {
  public apiURL = '';

  public reqHeader = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private httpClient: HttpClient, private product: Product) {
    this.apiURL = 'http://localhost:56044/api/products';
  }

  getProducts(): any {
    return this.httpClient
      .get(this.apiURL, {
        headers: this.reqHeader,
      })
      .pipe(
        map((res) => res),
        catchError(this.errorHandler)
      );
  }
  getProduct(id: number): any {
    return this.httpClient
      .get(this.apiURL + '/' + id, {
        headers: this.reqHeader,
      })
      .pipe(
        map((res) => res),
        catchError(this.errorHandler)
      );
  }
  udateProduct(prod: Product) {
    return this.httpClient
      .put(this.apiURL + '/' + prod.id, prod, {
        headers: this.reqHeader,
      })
      .pipe(
        map((res) => res),
        catchError(this.errorHandler)
      );
  }

  addProduct(prod: Product) {
    var data = {
      Name: prod.name,
      Description: prod.description,
      Price: prod.price,
      Image: prod.image,
    };
    return this.httpClient
      .post(this.apiURL, data, {
        headers: this.reqHeader,
      })
      .pipe(
        map((res) => res),
        catchError(this.errorHandler)
      );
  }

  deleteProduct(id: number) {
    return this.httpClient
      .delete(this.apiURL + '/' + id, {
        headers: this.reqHeader,
      })
      .pipe(
        map((res) => res),
        catchError(this.errorHandler)
      );
  }

  errorHandler(error: Response) {
    return throwError(error);
  }
}

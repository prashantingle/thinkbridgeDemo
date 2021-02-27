import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ProductlistComponent } from './components/productlist/productlist.component';
import { AddproductComponent } from './components/addproduct/addproduct.component';
import { DeleteproductComponent } from './components/deleteproduct/deleteproduct.component';
import { EditproductComponent } from './components/editproduct/editproduct.component';
import { ViewproductComponent } from './components/viewproduct/viewproduct.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Product } from './Model/product.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductlistComponent,
    AddproductComponent,
    DeleteproductComponent,
    EditproductComponent,
    ViewproductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [HttpClient, Product],
  bootstrap: [AppComponent],
})
export class AppModule {}

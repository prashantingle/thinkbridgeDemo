import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddproductComponent } from './components/addproduct/addproduct.component';
import { DeleteproductComponent } from './components/deleteproduct/deleteproduct.component';
import { EditproductComponent } from './components/editproduct/editproduct.component';
import { ProductlistComponent } from './components/productlist/productlist.component';
import { ViewproductComponent } from './components/viewproduct/viewproduct.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'add', component: AddproductComponent },
  { path: 'edit/:id', component: EditproductComponent },
  { path: 'list', component: ProductlistComponent },
  { path: 'delete/:id', component: DeleteproductComponent },
  { path: 'view/:id', component: ViewproductComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

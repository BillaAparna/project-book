import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyordersComponent } from '../myorders/myorders.component';
import { ViewproductsComponent } from '../viewproducts/viewproducts.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { AdminComponent } from './admin.component';

const routes: Routes = [{ path: '', component: AdminComponent ,children:[
  {path:'addproducts',component:AddProductsComponent},
  {path:'viewproducts',component:ViewproductsComponent},
  {path:"myorders",component:MyordersComponent},

  {path:'',redirectTo:"viewproducts",pathMatch:"full"}
]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  declarations: [
    AdminComponent,
    AddProductsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,SharedModule
  ]
})
export class AdminModule { }

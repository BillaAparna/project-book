import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewproductsComponent } from '../viewproducts/viewproducts.component';
import { SearchPipe } from '../search.pipe';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    ViewproductsComponent,
    SearchPipe
    
  ],
  exports:[SearchPipe],
  imports: [
    CommonModule,
    FormsModule

   
  ],
  
})
export class SharedModule { }

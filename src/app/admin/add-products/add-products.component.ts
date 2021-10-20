import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {

  constructor(private as:AdminService,private router:Router) { }

  ngOnInit(): void {
  }
  file:File;//file of typeFile
  selectfile(event){
    this.file=event.target.files[0]; 
    console.log(this.file)
  }
  onAddProduct(ref){
  
    let productObj=ref.value;
    //console.log(productObj);
    let formData=new FormData();
    //add file
    formData.append("photo",this.file,this.file.name)
//add user object
    formData.append("productObj",JSON.stringify(productObj))
    //console.log(formData)
    
    this.as.createproduct(formData).subscribe(
      res=>{
        if(res.message==="product created"){
          alert("product added successfully");
          //this.router.navigateByUrl("/viewproducts");
        }
        else{
          alert(res.message);
          //console.log(res.message)
        }
      
      },
      err=>{
        console.log(err)
        alert("something went wrong in product creation")
      }
    )
    ref.reset();
  }

  }


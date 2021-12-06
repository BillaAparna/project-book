import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';
import {NgForm} from "@angular/forms"
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
  public listItems:Array<string>=[];
  selectfile(event){
    this.file=event.target.files[0]; 
    //console.log(this.file)
  }
  
  categories:Array<any>=[{id:1,name:"Philosophy and religious"},{id:2,name:"Novel"},
  {id:3,name:"Fiction"},{id:4,name:"Fairy-tale"},
  {id:5,name:"Drama"},{id:6,name:"History"},
  {id:7,name:"Western"},{id:8,name:"Poems"},
  {id:9,name:"Non-Fiction"}]
  public categoryName:null;


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


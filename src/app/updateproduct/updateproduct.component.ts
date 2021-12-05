import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { AdminService } from '../admin/admin.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-updateproduct',
  templateUrl: './updateproduct.component.html',
  styleUrls: ['./updateproduct.component.css']
})
export class UpdateproductComponent implements OnInit {

  constructor(private router:Router,private activatedRoute:ActivatedRoute,private as:AdminService) {
    
   }
model;
file:File
newproductObject;
productobject={productname:"",model:"",price:"",category:"",productImage:""}
selectfile(event){
  this.file=event.target.files[0]; 
  //console.log(this.file)
}
  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe(paramsId => {
      this.model = paramsId.model;
     // console.log(this.model)
      this.as.getproductdetails(paramsId.model).subscribe(res=>{
     //   console.log(res.message)
        this.productobject.productname=res.message.productname;
        this.productobject.model=res.message.model;
        this.productobject.price=res.message.price;
        this.productobject.category=res.message.category;
        this.productobject.productImage=res.message.productImage;
        this.newproductObject=res.message;
      },
      err=>{
    
      })
    });



  

  
  
}

categories:Array<any>=[{id:1,name:"Myth"},{id:2,name:"Novel"},
{id:3,name:"Fiction"},{id:4,name:"Fairy-tale"},
{id:5,name:"Drama"},{id:6,name:"History"},
{id:7,name:"Western"},{id:8,name:"Poems"},
{id:9,name:"Non-Fiction"}]




onUpdateProduct(ref){
  let newproductObj=ref.value;
  
    //console.log("newproductobj",this.productobject)
    for(let v in newproductObj){
      this.productobject[v]=newproductObj[v]
    }
    console.log("modified new product obj",this.productobject)




    this.as.updateproduct(this.productobject).subscribe(res=>{
        alert("product updated successfully")
        this.router.navigateByUrl("/viewproducts")
    },err=>{

    })


}

}

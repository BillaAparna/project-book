import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin/admin.service';
import { UserService } from '../user.service';
import { FilterPipe } from '../pipe-folder/filter.pipe';
import { AddProductsComponent } from '../admin/add-products/add-products.component';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-viewproducts',
  templateUrl: './viewproducts.component.html',
  styleUrls: ['./viewproducts.component.css']
})
export class ViewproductsComponent implements OnInit {

  constructor(private as:AdminService,private us:UserService,private router:Router) { }
products=[]
currentUser;









categories:Array<any>=[{id:1,name:"Philosophy and religious"},{id:2,name:"Novel"},
  {id:3,name:"Fiction"},{id:4,name:"Fairy-tale"},
  {id:5,name:"Drama"},{id:6,name:"History"},
  {id:7,name:"Western"},{id:8,name:"Poems"},
  {id:9,name:"Non-Fiction"}]
public categoryName:'';
searchObject={category:'',searchitem:''};
  ngOnInit(): void {

    this.getdata();
    
  }
  getdata(){
    this.currentUser=localStorage.getItem("username")

    this.as.getproducts().subscribe(res=>{
        this.products=res.message;
    },
    err=>{
      console.log("something went wrong in reading products ")
    })
  }
  reset(){
    //console.log("reset called")
    this.searchObject["category"]='';
    this.searchObject["searchitem"]='';
    this.getdata();
    //console.log(this.searchObject)
  }
  //product selected by user
 
  onProductSelect(productObject){
    let username=localStorage.getItem("username")
    
    
    let newUserProductObj={username,productObject}
    

    this.us.sendProductToUserCart(newUserProductObj).subscribe(res=>{
      alert(res.message)
      this.us.updateDataObservable(res.latestcartobj)
    },err=>{
      console.log("error in products adding to cart");
      alert("error in products adding to cart")
    }
    )
    


}
  onProductdelete(productObject){
    //console.log(productObject.model)
    this.as.deleteproductfromlist(productObject).subscribe(res=>{
     // console.log("product object is",productObject)
      alert(res.message)
      this.onproductdeletefromcart(productObject);
      this.getdata();
     
      //this.us.updateDataObservable(res.latestcartobj)
    },err=>{
      console.log("error in products deleteing");
      alert("error in products deleting")
    }
    )
  }
 
  onproductdeletefromcart(latestobj){
   // console.log(latestobj)


    //console.log(newUserProductObj)
    this.us.deletefromcart(latestobj).subscribe(res=>{

    },
    err=>{

    })
  }
  edit(product){
    this.router.navigateByUrl(`updateproduct/${product.model}`)
  }
  onSearchProduct(ref){
    this.searchObject=ref.value;
    console.log(this.searchObject)
  }

 









  
}

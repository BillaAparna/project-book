import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin/admin.service';
import { UserService } from '../user.service';
import { FilterPipe } from '../pipe-folder/filter.pipe';
@Component({
  selector: 'app-viewproducts',
  templateUrl: './viewproducts.component.html',
  styleUrls: ['./viewproducts.component.css']
})
export class ViewproductsComponent implements OnInit {

  constructor(private as:AdminService,private us:UserService) { }
products=[]
currentUser;

searchKey:string="";

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
}

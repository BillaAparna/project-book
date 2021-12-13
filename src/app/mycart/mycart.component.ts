
import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin/admin.service';
import { UserService } from '../user.service';
import {formatDate} from '@angular/common';
@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.css']
})
export class MycartComponent implements OnInit {
  @ViewChild('closebutton') closebutton;
  constructor(private us:UserService,public router:Router,private as:AdminService,
    ) { }
  userCartObject;
  products=[]
  count;
  ngOnInit(): void {
    
    let username=localStorage.getItem("username")
    this.us.dataObservable.subscribe(res=>{
      if(res["message"]==="cart-empty"){
        alert("cart-is-empty");
      }
      else{
        
        this.products=res["products"];
      }
    },err=>{
        console.log("error in retriving cart elements");
        alert("error in retriving cart elements")
    })  
    this.us.dataObservable.subscribe(
      prodObj=>{
        if(prodObj==0){
            this.count=0;
        }
        else{
          this.count=prodObj.products.length;
        }
      }
    )   
  }
 /* onProductdeletefromCart(productObject){
    let username=localStorage.getItem("username")
    let newUserProductObj={username,productObject}
    this.us.deletefromUserCart(newUserProductObj).subscribe(res=>{
      alert(res.message)
      this.us.updateDataObservable(res.latestcartobj)
    },err=>{
      console.log("error in products deleteing cart");
      alert("error in products deleting to cart")
    }
    )
  
  }*/
  increaseCount(productObject){
    let username=localStorage.getItem("username")
    
    
    let newUserProductObj={username,productObject}
    

    this.us.sendProductToUserCart(newUserProductObj).subscribe(res=>{
     // alert(res.message)
      this.us.updateDataObservable(res.latestcartobj)
    },err=>{
      console.log("error in products adding to cart");
      alert("error in products adding to cart")
    }
    )
  }
  currentdate=new Date();

  decreaseCount(productObject){
    let username=localStorage.getItem("username")
    
    
    let newUserProductObj={username,productObject}
    if(productObject.count==1){
        this.us.deletefromUserCart(newUserProductObj).subscribe(res=>{
          this.us.updateDataObservable(res.latestcartobj)

        },
        err=>{

        })
    }
    else{
    this.us.deletefromrange(newUserProductObj).subscribe(res=>{
     // alert(res.message)
      this.us.updateDataObservable(res.latestcartobj)
    },err=>{

      alert("error in products deleting from  cart")
    }
    )
  }

  }

  total(count,price){

    return count*price
  }

totalsum(products){
  let s=0;
  for(let v of products){
    s+=(v.count*v.price)

  }
  
  return s;
}



OnOrder(ref){
  alert("your order has been placed successfully")

  this.closebutton.nativeElement.click();
  window.location.reload();
  this.router.navigateByUrl("/thank_you")
  
  let newUserProductObj={date:formatDate(this.currentdate, 'yyyy-MM-dd', 'en-US'),orderedproducts:[]}
  let sum=0;
  for(let v of this.products){
    newUserProductObj["orderedproducts"].push({item:v["productname"],no_of_items:v["count"],totalprice:v["count"]*v["price"]})
    sum=sum+v["count"]*v["price"];
  }
  newUserProductObj["TotalPrice"]=sum;
  newUserProductObj["CompleteAddress"]={username:ref.value.username,mobilenumber:ref.value.phonenumber,state:ref.value.state,city:ref.value.city,address:ref.value.address,zip:ref.value.zip}
  this.as.order(newUserProductObj).subscribe(res=>{

  },err=>{

  })
  this.products=[];
  let username=localStorage.getItem("username")
  //console.log(username)
  this.us.deletecart(username).subscribe(res=>{
    
    
  },
  err=>{
    alert(err.message)
  })
  let userorderlist={username:username,Date: formatDate(this.currentdate, 'yyyy-MM-dd', 'en-US'),Products:newUserProductObj["orderedproducts"],TotalPrice:sum}
  //console.log(userorderlist)
  this.us.addtouserOrderList(userorderlist).subscribe(res=>{
    
    
  },
  err=>{
    alert(err.message)
  })
   

}
}

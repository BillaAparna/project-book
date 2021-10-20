import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.css']
})
export class MycartComponent implements OnInit {

  constructor(private us:UserService) { }
  userCartObject;
  products=[]
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










}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { observable, Subscriber } from 'rxjs';
import { UserService } from '../user.service';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private hc:HttpClient,private us:UserService,private router:Router) { }
  userObj;
  count;
  ngOnInit(): void {
    //this.router.navigateByUrl("/viewproducts")
    this.userObj=JSON.parse(localStorage.getItem("userObj")); 

 
//get usercart object from API
    this.us.getproductsfromcart(this.userObj.username).subscribe(res=>{
      if(res.message==="cart-empty"){
        this.us.updateDataObservable(0);
      }
      else{
        this.us.updateDataObservable(res.message);
        
      }
      this.us.dataObservable.subscribe(
        prodObj=>{
          if(prodObj==0){
              this.count=0;
          }
          else{
            this.count=prodObj.products.length;
          }
        }
      )})
    







  }
  getprivatedata(){
    this.hc.get("/user/testing").subscribe(
      res=>{
        alert(res['message'])
      },
      err=>{
        alert("error occured in getprivate data")
      }
    )
  }
  

}

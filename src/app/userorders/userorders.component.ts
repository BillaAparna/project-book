import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-userorders',
  templateUrl: './userorders.component.html',
  styleUrls: ['./userorders.component.css']
})
export class UserordersComponent implements OnInit {

  constructor(public us:UserService) { }
  orders=[]
  countOrders;
  ngOnInit(): void {

    let username=localStorage.getItem("username")
    this.us.dataObservableOrder.subscribe(res=>{
      if(res["message"]==="no-orders"){
        alert("no-orders");
      }
      else{
        
        this.orders=res["orders"];
        console.log(this.orders)
      }
    },err=>{
        console.log("error in retriving orders");
        alert("error in retriving orders")
    })  
    this.us.dataObservableOrder.subscribe(
      prodObj=>{
        if(prodObj==0){
            this.countOrders=0;
        }
        else{
          this.countOrders=prodObj.orders.length;
        }
      }
    )   
  }
  get sortData() {
    return this.orders.sort((a, b) => {
      return <any>new Date(b.Date) - <any>new Date(a.Date);
    });
  }

}

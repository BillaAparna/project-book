import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin/admin.service';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css']
})
export class MyordersComponent implements OnInit {

  constructor(public as:AdminService) { }
  orders=[]
  ngOnInit(): void {
    this.getdata();
  }
  getdata(){
    this.as.getorders().subscribe(res=>{
      this.orders=res.message;
      console.log(this.orders)
  },
  err=>{
    console.log("something went wrong in reading ordered products ")
  })
  }
  len(orders){
    return this.orders.length
  }
  

}

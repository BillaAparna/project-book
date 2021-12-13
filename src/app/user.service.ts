import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  

  userLoginStatus=false;
  constructor(private hc:HttpClient) { 
    if(localStorage.getItem("username")!==null){
      this.userLoginStatus=true;
    }
  }
  dataSource=new BehaviorSubject<any>(0)

  dataObservable=this.dataSource.asObservable();
  
  dataSourceOrder=new BehaviorSubject<any>(0)
  dataObservableOrder=this.dataSourceOrder.asObservable();

  updateDataObservable(data){
    this.dataSource.next(data)
  }
  updatedataObservableOrder(data){
    this.dataSourceOrder.next(data)
  }


  contactus(contactObj):Observable<any>{
    return this.hc.post("/user/addcontactqueries",contactObj);
  }









  createUser(registerObj):Observable<any>{
    return this.hc.post("/user/createuser",registerObj)
  }

  loginUser(userObj):Observable<any>{
    if(userObj.type=="user"){
    return this.hc.post("/user/login",userObj)
    }
    if(userObj.type=="admin"){
      return this.hc.post("/admin/login",userObj)
    }
  }
  getuser(username):Observable<any>{
    return this.hc.get(`/user/getuser/${username}`)
  }
  sendProductToUserCart(productObject):Observable<any>{
    return this.hc.post("/user/add-to-cart",productObject)
  }
  getproductsfromcart(username):Observable<any>{
    return this.hc.get(`/user/getproducts/${username}`);
  }
  deletefromcart(newUserProductObj):Observable<any>{
    return this.hc.post("/user/delete-from-cart",newUserProductObj)
  }
  deletefromUserCart(productObject):Observable<any>{
    return this.hc.post("/user/deletefromusercart",productObject)
  }
  deletefromrange(newUserProductObj):Observable<any>{
    return this.hc.post("/user/delete-from-range",newUserProductObj)
  }
  deletecart(username):Observable<any>{
    //console.log(username)
    return this.hc.get(`/user/delete-cart/${username}`)
  }
  addtouserOrderList(orderObject):Observable<any>{
    return this.hc.post("/user/addtouserOrderList",orderObject)
  }
  getuserorders(username):Observable<any>{
    return this.hc.get(`/user/getorders/${username}`)
  }
}
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

  updateDataObservable(data){
    this.dataSource.next(data)
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
}
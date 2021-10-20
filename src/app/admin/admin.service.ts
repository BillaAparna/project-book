import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private hc:HttpClient) { }
  createproduct(productObj):Observable<any>{
    return this.hc.post('/product/createproduct',productObj);
  }
  
  getproducts():Observable<any>{
    return this.hc.get('/product/getprodcuts');
  }
  deleteproductfromlist(productObject):Observable<any>{
    return this.hc.post("/product/delete-from-list",productObject)
  }
}

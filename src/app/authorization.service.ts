import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthorizationService  implements HttpInterceptor{

  constructor() { }
  intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
    //write intercept logic
    let token=localStorage.getItem("token");
    //if token is exist
    if(token){
      //add bearer to headers of req object
        const clonedReqObj=req.clone({
          headers:req.headers.set("Authorization",`Bearer ${token}`)
        })
        //passs request object to next interceptor or backedn if interceptor is not existed
        return next.handle(clonedReqObj);
    }
    //if token is not exist
    else{
        return next.handle(req);
    }
    return ;

  }
}

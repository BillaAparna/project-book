import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(public router:Router){

  }
  canActivate(): boolean {
    if(localStorage.getItem("username")==null){
      alert("plz login to continue");
      this.router.navigateByUrl("/login");
      return false;
    }
    else{
    return true;
    }
  }
}

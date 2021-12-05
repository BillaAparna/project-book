import { Component } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'application1';
  constructor(public us:UserService,public router:Router){}

  loginObj;

  onLogin(){


            //update userLoginStatus
            
            this.loginObj=JSON.parse(localStorage.getItem("userObj")); 
            

            
            if(this.loginObj.type=="admin"){
              console.log("success")
              this.router.navigateByUrl(`admin/${this.loginObj.username}`)
            }
            if(this.loginObj.type=="user"){
            this.router.navigateByUrl(`userprofile/${this.loginObj.username}/viewproducts`)
            }

      
    //console.log(loginObj);
    
  }






userLogout(){
  localStorage.clear();
  this.us.userLoginStatus=false;
}
}

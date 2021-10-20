import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private us:UserService,private router:Router) { }

  ngOnInit(): void {
  }
  onLogin(ref){
    let loginObj=ref.value;
   // console.log(loginObj);
    this.us.loginUser(loginObj).subscribe(
      res=>{
        if(res.message==="login success"){
            localStorage.setItem("token",res.token);
            localStorage.setItem("username",res.username);
            localStorage.setItem("userObj",JSON.stringify(res.userObj))
            //update userLoginStatus
            this.us.userLoginStatus=true;
            if(loginObj.type=="admin"){
              console.log("success")
              this.router.navigateByUrl(`admin/${res.username}`)
            }
            if(loginObj.type=="user"){
            this.router.navigateByUrl(`userprofile/${res.username}/viewproducts`)
            }

        }
        else{
          alert(res.message)
        }
      },
      err=>{
        console.log(err);
        alert("something went wrong in login ")
      })
    //console.log(loginObj);
    
  }
}

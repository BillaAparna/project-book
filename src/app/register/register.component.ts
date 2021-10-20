import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
//inject userservice object
  constructor(private us:UserService,private router:Router) { }

  ngOnInit(): void {
  }

file:File;//file of typeFile
selectfile(event){
  this.file=event.target.files[0]; 
  console.log(this.file)
}

  onRegister(ref){
    let registerObj=ref.value;
    console.log(registerObj);
    let formData=new FormData();
    //add file
    formData.append("photo",this.file,this.file.name)
//add user object
    formData.append("registerObj",JSON.stringify(registerObj))
    console.log(formData)
    this.us.createUser(formData).subscribe(
      res=>{
        if(res.message==="user created"){
          alert("user created successfully");
          this.router.navigateByUrl("/login")
        }
        else{
          alert(res.message);
          //console.log(res.message)
        }
      
      },
      err=>{
        console.log(err)
        alert("something went wrong in user creation")
      }
    )
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  constructor(private router:Router,private us:UserService) { }

  ngOnInit(): void {
  }
  onLoginto(ref){

    let contactObj=ref.value;
   // console.log(loginObj);
    this.us.contactus(contactObj).subscribe(
      res=>{
        if(res.message=="success"){
          this.router.navigateByUrl("/thank_you");
        }
        },
      err=>{
        console.log(err);
        alert("something went wrong in contact form ")
      })
    //console.log(loginObj);
    
  
  }
}

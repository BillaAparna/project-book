
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './admin.guard';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MycartComponent } from './mycart/mycart.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { RegisterComponent } from './register/register.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { UpdateproductComponent } from './updateproduct/updateproduct.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ViewproductsComponent } from './viewproducts/viewproducts.component';
const routes: Routes = [
  {path:"home",component:HomeComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"cart",component:MycartComponent},
  {path:"userprofile/:username",component:UserProfileComponent,children:[
    {path:'viewproducts',component:ViewproductsComponent},
    {path:'cart',component:MycartComponent},

  ],




  
},
{path:"updateproduct/:model",component:UpdateproductComponent},

{path:"thank_you",component:ThankYouComponent},
{path:"contactus",component:ContactUsComponent},
  { path: 'admin/:username', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),canActivate :[AdminGuard] },

  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'**',component:PagenotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MycartComponent } from './mycart/mycart.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { UserProfileComponent } from './user-profile/user-profile.component'
import { AuthorizationService } from './authorization.service';
import { SharedModule } from './shared/shared.module';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { UpdateproductComponent } from './updateproduct/updateproduct.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    MycartComponent,
    UserProfileComponent,

    PagenotfoundComponent,
     ContactUsComponent,
     ThankYouComponent,
     UpdateproductComponent,
    
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule ,
    HttpClientModule,
    SharedModule,
    NgbModule,
    BrowserAnimationsModule,
    RouterModule
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthorizationService,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }

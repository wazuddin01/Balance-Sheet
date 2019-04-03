import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {  FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:string;
  password:string;
  constructor(
    private authService:AuthService,
    private flashMessages:FlashMessagesService,
    private router:Router
  ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(user=>{
      if(user){
        this.router.navigate(['/']);
      }
    })
  }
  
  submit(){
    this.authService.login(this.email,this.password)
    .then(res=>{
      this.flashMessages.show('sucesssfully logged in',{
        cssClass:'alert-success',timeOut:4000
      });
      this.router.navigate(['/']);
    }).catch(err=>{
      this.flashMessages.show('Some Credential are wrong',{
        cssClass:'alert-warning',timeOut:4000
      });
      //console.log(err);
    })
  }

}

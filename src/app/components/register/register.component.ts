import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;
  constructor(
    private authService: AuthService,
    private flashMessages: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
  }
submit(){
  this.authService.register(this.email,this.password)
    .then(res=>{
      this.flashMessages.show('You are now Registerd',{
        cssClass:'alert-success',timeOut:4000
      });
      this.router.navigate(['/']);
    }).catch(err=>{
      this.flashMessages.show(err.messages,{
        cssClass:'alert-danger',timeOut:4000
      })
    })
}
}

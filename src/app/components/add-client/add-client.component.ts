import { Component, OnInit } from '@angular/core';
import { Client } from '../../models/clients';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';



@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  client: Client = {
    id: '',
    FirstName: '',
    LastName: '',
    email: '',
    phone: 0,
    balance: 0
  }
  disableBalanceOnAdd: boolean;
  constructor(
    private router: Router,
    private Cservice: ClientService,
    private flashService: FlashMessagesService,
    
  ) { }
  ngOnInit() {

  }
  form = new FormGroup({
    FirstName: new FormControl('', [
      Validators.required,
      Validators.minLength(4)]),
    LastName: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    email: new FormControl('', [
      Validators.email,
      Validators.required
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10)]),
    balance: new FormControl({value:0}, Validators.required)
  });
  submit() {
    this.client = this.form.value;
    if (!this.form.valid) {
      this.flashService.show('Fill Form Correctly', {
        cssClass: 'alert-warning', timeOut: 4000
      });
    }
    else {
      this.Cservice.addClient(this.client);
      this.flashService.show('User has Sucessfully Registered', {
        cssClass: 'alert-success', timeOut: 4000
      });
      this.router.navigate(['/']);
    }

  }
  get firstName() {
    return this.form.get('FirstName');
  }
  get lastName() {
    return this.form.get('LastName');
  }
  get email() {
    return this.form.get('email');
  }
  get phone() {
    return this.form.get('phone');
  }
  get balance() {
    return this.form.get('balance');
  }

}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClientService } from 'src/app/services/client.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Client } from 'src/app/models/clients';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  client: Client = {
    id: '',
    FirstName: '',
    LastName: '',
    email: '',
    phone: 0,
    balance: 0
  };
  id: string;

  constructor(
    private router: Router,
    private ActivateRoute: ActivatedRoute,
    private clientService: ClientService,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.id = this.ActivateRoute.snapshot.params['id'];
    this.clientService.getClient(this.id).subscribe(client => {
      this.client = client;
      // console.log(client);
    });
  }
  editForm = new FormGroup({
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
    balance: new FormControl(0, Validators.required)
  })
  submit() {
    if (!this.editForm.valid) {
      this.flashMessage.show('Form is not valid', {
        cssClass: 'alert-warning', timeOut: 4000
      });
    }
    else {
      this.client = this.editForm.value;
      this.client.id = this.id;
      this.clientService.updateClient(this.client);
      this.flashMessage.show('User Updated', {
        cssClass: 'alert-success', timeOut: 4000
      });
      this.router.navigate(['/client/' + this.id])
    }
  }
  get firstName() {
    return this.editForm.get('FirstName');
  }
  get lastName() {
    return this.editForm.get('LastName');
  }
  get email() {
    return this.editForm.get('email');
  }
  get phone() {
    return this.editForm.get('phone');
  }
  get balance() {
    return this.editForm.get('balance');
  }
}

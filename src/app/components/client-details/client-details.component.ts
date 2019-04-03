import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Client } from 'src/app/models/clients';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  id: string;
  client: Client;
  hasBalance: boolean;
  showBalanceUpdateInput: boolean;

  constructor(
    private router: Router,
    private ActivateRoute: ActivatedRoute,
    private clientService: ClientService,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.id = this.ActivateRoute.snapshot.params['id'];
    this.clientService.getClient(this.id).subscribe(client => {
      if (this.client != null) {
        if (this.client.balance > 0) {
          this.hasBalance = true;
        }
      }
      this.client = client;
      //console.log(client);
    })
  }

  updateBalance() {
    this.clientService.updateClient(this.client);
    this.flashMessage.show('Balance is Updated', {
      cssClass: 'alert-success', timeOut: 4000
    });
  }

  onDeleteClick(){
    if(confirm('Are You Sure')){
      this.clientService.deleteClient(this.client);
      this.flashMessage.show('Client Deleted', {
        cssClass: 'alert-success', timeOut: 4000
      });
      this.router.navigate(['/']);
    }
  }
}

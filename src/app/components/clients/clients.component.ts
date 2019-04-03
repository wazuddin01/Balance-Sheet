import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import {Client} from '../../models/clients';
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients:Client[];
  totalOwed:number;
  constructor(private clientService:ClientService) { }

  ngOnInit() {
    this.clientService.getClients()
      .subscribe(clients =>
         this.clients=clients
      );
   
    }

}

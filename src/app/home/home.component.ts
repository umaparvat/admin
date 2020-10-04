import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from 'rxjs';

import {MessageService} from "../_services/message.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  @Input() title: string;
  subscription: Subscription;
  constructor(private route: ActivatedRoute, private messageService: MessageService) { 
    this.messageService.getMessage().subscribe(message => {
      if (message) {
        console.log("message received", message);
        this.title = message.title;
      } else {
        if (!this.title) {
          this.title = "Files-Admin"
        }
      }
    })

  }

  ngOnInit(): void {
    console.log("home calling");
  }

  ngOnDestroy(): void {
    this.subscription? this.subscription.unsubscribe(): '';

  }

}

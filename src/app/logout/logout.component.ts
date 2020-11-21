import { Component, OnInit, ViewChild, Output,EventEmitter } from '@angular/core';
import {AuthService} from "../_services/auth.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  @ViewChild('closebutton') closebutton;
  message: string;
  constructor(public authService: AuthService, private modalService:NgbModal) { 
    this.message = '';
    console.log("logout component initiated")
  }

  ngOnInit(): void {
  }
  logout(): boolean {
    this.authService.logout();
    this.closebutton.nativeElement.click();
    return false;
  }

}

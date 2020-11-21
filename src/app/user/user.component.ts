import { Component, OnInit, ViewChild } from '@angular/core';
import {AuthService} from "../_services/auth.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @ViewChild('closebutton') closebutton;
  message: string;
  constructor(public authService: AuthService, private modalService:NgbModal) { 
    this.message = '';
    console.log("login component initiated")
  }
    

  ngOnInit(): void {


  }
  login(username: string, password: string): boolean {
    this.message = '';
    if (!this.authService.login(username, password)){
      this.message = 'Incorrect credentails';
      setTimeout(function() {
        this.message = '';
      }.bind(this), 2500);
    }
    this.closebutton.nativeElement.click();
    return false;
  }

  logout(): boolean {
    this.authService.logout();
    return false;
  }

}

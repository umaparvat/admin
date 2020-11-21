import { Component, OnInit, OnChanges, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, ParamMap} from "@angular/router";
import {Form, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import  {MessageService} from "./_services/message.service";
import {UserComponent} from "./user/user.component";
import {LogoutComponent} from "./logout/logout.component";
import {AuthService} from "./_services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  username: string = "Login";
  @Output() title = 'Files-Admin';
  regionform: FormGroup;
  @Output() region: any = "eu-fr-paris";
  @Output() loggedin: EventEmitter<any> = new EventEmitter<any>(); 
   constructor(private router: Router, private fb: FormBuilder,
     private messageService: MessageService, 
     private modalService: NgbModal, private authService:AuthService) {
     this.sendMessage({'title': this.title});

   }
   ngOnInit(): void {
     this.regionform = this.fb.group(
       {regions: ['', [Validators.required]]}

     )
     this.authService.getEmitter().subscribe((customObject) => { 
      console.log("Component is notified of successfull login!");
      console.log(customObject) ;
      this.username = customObject
    });

     this.regionform.valueChanges.subscribe(forms => {
       console.log("form value is", JSON.stringify(forms))
       this.region = forms.regions;
       this.sendMessage({'region': this.region})
       console.log("region value is now after send messgae in init", this.region);
     })

   }

   sendMessage(item: any) {
     this.messageService.sendMessage(item)
   }

   clearMessages(): void {
     this.messageService.clearMessages();
   }

   onChange(event: any){
     console.log("selected value is ", event.target.value);
     this.region = event.target.value;
     this.sendMessage({'region': this.region})
     console.log("sent message in onchange")
   }

   onChangeofOptions(event: any) {

   }
   openLoginForm() {
    
    if (this.username == 'Login') {
      console.log(this.username)
      const modalRef = this.modalService.open(UserComponent);
   } else {
     console.log("in else", this.username)
     const modalRef = this.modalService.open(LogoutComponent);
   }
   }

}

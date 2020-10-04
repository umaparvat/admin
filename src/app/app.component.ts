import { Component, OnInit, OnChanges, Output, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap} from "@angular/router";
import {Form, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

import  {MessageService} from "./_services/message.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @Output() title = 'Files-Admin';
  regionform: FormGroup;
  @Output() region: any = "eu-fr-paris";
   constructor(private router: Router, private fb: FormBuilder, private messageService: MessageService) {
     this.sendMessage({'title': this.title});

   }
   ngOnInit(): void {
     this.regionform = this.fb.group(
       {regions: ['', [Validators.required]]}
     )

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
}

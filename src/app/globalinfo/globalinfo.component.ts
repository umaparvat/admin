import { Component, Input, OnInit, OnChanges, ChangeDetectionStrategy, OnDestroy, ViewChild } from '@angular/core';
import { GlobalInfo} from "./globalinfo.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { isNgTemplate } from '@angular/compiler';
import {FormsModule, FormGroup, FormBuilder, FormControl} from "@angular/forms";
import {Router, ActivatedRoute, ParamMap} from "@angular/router";
import {Subscription} from 'rxjs';

import {MessageService} from "../_services/message.service";

@Component({
  selector: 'app-globalinfo',
  templateUrl: './globalinfo.component.html',
  styleUrls: ['./globalinfo.component.css']
})
export class GlobalinfoComponent implements OnInit {
  @ViewChild('closebutton') closebutton;
  gcinfoform: FormGroup;
  editGlobalInfoForm: FormGroup;
  @Input() region: any;
  globalInfos: Array<GlobalInfo>= [];
  propertyResults: Array<GlobalInfo>;
  nowData: GlobalInfo;
  p: number = 1;
  property: string;
  value: string;
  zones =  {
    "eu-fr-paris": ["eu-fr-paris-1", "eu-fr-paris-2"],
    "eu-fr-north": ["eu-fr-north-1"]
  }
  properties: Array<any> = [
    {"property": "max_quota", "value": 10
  },
  {"property": "max_cg", "value": 5},
  {"property": "max_sync", "value": 1}
  ]
  subscription: Subscription;
  constructor(private modalService: NgbModal, 
    private fb: FormBuilder, 
    private route: ActivatedRoute, private messageService: MessageService) { }

  ngOnInit(): void {
    console.log("globalinfo initiated")
    this.gcinfoform = this.fb.group({
      props: new FormControl()

    });
    this.editGlobalInfoForm = this.fb.group({
      props: [''],
      prop_value: ['']
    })
    // this part will get the json result from api and populate the value in array.
    this.properties.forEach(item => {
      this.globalInfos.push(new GlobalInfo(item.property, item.value))
    });
    this.subscription = this.messageService.getMessage().subscribe(message => {
      console.log("inside")
      if (message) {
        console.log("message received", message);
        this.region = this.zones[message.region];
        console.log("region in init is sub ", this.region)  
        this.submit();
      } else {
        if (!this.region) {
          this.region = this.zones["eu-fr-paris"];
          console.log("region in init is sub ", this.region)  
          this.submit();
        }
      }
    })
    if (!this.propertyResults) {
      this.submit();
    } else {
      console.log("subcr", this.subscription)
    }

    this.gcinfoform.valueChanges.subscribe(form => {
      console.log(JSON.stringify(form), typeof(form), form.props)
      this.propertyResults = this.find(form.props)
    })

  //ngonint close
}

ngOnDestroy(): void {
  this.subscription?this.subscription.unsubscribe(): '';
}

edit(targetModal: NgbModal, gc: GlobalInfo){
  this.modalService.open(targetModal, {
    centered: true,
    backdrop: 'static'
   });
  this.editGlobalInfoForm.patchValue({
    props: gc.property,
    prop_value: gc.value
  })

}
find(props): Array<GlobalInfo> {
  console.log("in find", props);
  if (props === "" || props === null){
    props = undefined;
  }
  
  if ((props === undefined || props === null)) {
    console.log('im here')
    this.propertyResults = this.globalInfos;
    return this.propertyResults
  } else {
  this.propertyResults = this.globalInfos.filter((item)=> props? item.property === props: item)
 
  console.log("now result is ", this.propertyResults)
  return this.propertyResults;
      
  }
  
}

submit() {
  console.log("in submit", this.gcinfoform.value)
  this.propertyResults = this.find(this.gcinfoform.value.props)
  
}

save() {
  console.log("on submit called")
  this.modalService.dismissAll();
  //this.closebutton.nativeElement.click()
  console.log("res:", this.editGlobalInfoForm.getRawValue());
 }

// class close
}

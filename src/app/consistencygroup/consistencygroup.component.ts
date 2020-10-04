import { Component, Input, OnInit, OnChanges, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { consistencyGroup} from "./consistencygroup.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { isNgTemplate } from '@angular/compiler';
import {FormsModule, FormGroup, FormBuilder, FormControl} from "@angular/forms";
import {Router, ActivatedRoute, ParamMap} from "@angular/router";
import {Subscription} from 'rxjs';

import {MessageService} from "../_services/message.service";

@Component({
  selector: 'app-consistencygroup',
  templateUrl: './consistencygroup.component.html',
  styleUrls: ['./consistencygroup.component.css']
})
export class ConsistencygroupComponent implements OnInit, OnDestroy {
  cgform: FormGroup;
  @Input() region: any;
  ConsistencyGroups: Array<consistencyGroup>= [];
  resultGroups: Array<consistencyGroup>;
  nowData: consistencyGroup;
  p: number = 1;
  cg_id: string;
  act_id: string;
  status: string;
  vol_name: string;
  zones =  {
    "eu-fr-paris": ["eu-fr-paris-1", "eu-fr-paris-2"],
    "eu-fr-north": ["eu-fr-north-1"]
  }
  groups: Array<any> = [
    {"resource_id": "123-adf",
     "status": "provisioning",
     "replication": {
       "replicationMode": "async",
       "targetAvailabilityZone":["eu-fr-paris-2"],
       "georedundancy":{
         "targetAvailabilityZone": ["eu-fr-north-1"],
         "uuid": "213-adf"
       }
     },
     "availability_zone": "eu-fr-paris-1",
     "resource_data":{
       "account_id": "45-tyt",
       "availabilityzone": {
         "eu-fr-paris-1": {
           "filer_id": 1,
           "filer_detail": "cmoprd123",
           "vol_uuid": "12-rte-45",
           "vol_name": "vqnxmo",
           "svm_id": 2,
           "svm_name": "svwe334",
           "aggr_name":"data_svwe334"
         },
         "eu-fr-paris-2": {
          "filer_id": 2,
          "filer_detail": "cmoprd23",
          "vol_uuid": "21-rte-45",
          "vol_name": "vqnxmo",
          "svm_id": 4,
          "svm_name": "svwe444",
          "aggr_name":"data_svwe444"
        },
        "eu-fr-north-1": {
          "filer_id": 5,
          "filer_detail": "cmoprd33",
          "vol_uuid": "123-rte-45",
          "vol_name": "vqnxmo",
          "svm_id": 3,
          "svm_name": "svwe434",
          "aggr_name":"data_svwe434"
        },

       }
     },
     "is_replicated": true
  },
  {"resource_id": "23-adf",
  "status": "switching",
  "replication": {
    "replicationMode": "sync",
    "targetAvailabilityZone":["eu-fr-paris-2"],
  },
  "availability_zone": "eu-fr-paris-1",
  "resource_data":{
    "account_id": "345-tyt",
    "availabilityzone": {
      "eu-fr-paris-1": {
        "filer_id": 1,
        "filer_detail": "cmoprd123",
        "vol_uuid": "12-rte-45",
        "vol_name": "vqnxmo",
        "svm_id": 2,
        "svm_name": "svwe334",
        "aggr_name":"data_svwe334"
      },
      "eu-fr-paris-2": {
       "filer_id": 2,
       "filer_detail": "cmoprd23",
       "vol_uuid": "21-rte-45",
       "vol_name": "vqnxmo",
       "svm_id": 4,
       "svm_name": "svwe444",
       "aggr_name":"data_svwe444"
     },
    }
  },
  "is_replicated": true,
  "tags": []
},
{"resource_id": "323-adf",
"status": "switchingfailed",
"replication": {
  "georedundancy":{
    "targetAvailabilityZone": ["eu-fr-north-1"],
    "uuid": "213-adf"
  }
},
"availability_zone": "eu-fr-paris-1",
"resource_data":{
  "account_id": "345-tyt",
  "availabilityzone": {
    "eu-fr-paris-1": {
      "filer_id": 1,
      "filer_detail": "cmoprd123",
      "vol_uuid": "12-rte-45",
      "vol_name": "vwxnxmo",
      "svm_id": 2,
      "svm_name": "svwe334",
      "aggr_name":"data_svwe334"
    },
   "eu-fr-north-1": {
     "filer_id": 5,
     "filer_detail": "cmoprd33",
     "vol_uuid": "123-rte-45",
     "vol_name": "vwxnxmo",
     "svm_id": 3,
     "svm_name": "svwe434",
     "aggr_name":"data_svwe434"
   },

  }
},
"is_replicated": true,
"tags":[]
},
{"resource_id": "423-adf",
"status": "rollback",
"replication": {},
"availability_zone": "eu-fr-paris-1",
"resource_data":{
  "account_id": "345-tyt",
  "availabilityzone": {
    "eu-fr-paris-1": {
      "filer_id": 1,
      "filer_detail": "cmoprd123",
      "vol_uuid": "12-rte-45",
      "vol_name": "vtrnxmo",
      "svm_id": 2,
      "svm_name": "svwe334",
      "aggr_name":"data_svwe334"
    },
  }
},
"is_replicated": false,
"tags": ["non replicated"]
},
{"resource_id": "1-adf",
"status": "rollbackfailed",
"replication": {
  "replicationMode": "async",
  "georedundancy":{
    "targetAvailabilityZone": ["eu-fr-paris-1", "eu-fr-paris-2"],
    "uuid": "213-adf"
  }
},
"availability_zone": "eu-fr-north-1",
"resource_data":{
  "account_id": "345-tyt",
  "availabilityzone": {
    "eu-fr-paris-1": {
      "filer_id": 1,
      "filer_detail": "cmoprd123",
      "vol_uuid": "12-rte-45",
      "vol_name": "vqnxmo",
      "svm_id": 2,
      "svm_name": "svwe334",
      "aggr_name":"data_svwe334"
    },
    "eu-fr-paris-2": {
     "filer_id": 2,
     "filer_detail": "cmoprd23",
     "vol_uuid": "21-rte-45",
     "vol_name": "vqnxmo",
     "svm_id": 4,
     "svm_name": "svwe444",
     "aggr_name":"data_svwe444"
   },
   "eu-fr-north-1": {
     "filer_id": 5,
     "filer_detail": "cmoprd33",
     "vol_uuid": "123-rte-45",
     "vol_name": "vqnxmo",
     "svm_id": 3,
     "svm_name": "svwe434",
     "aggr_name":"data_svwe434"
   },

  }
},
"is_replicated": true
},
{"resource_id": "2-adf",
"status": "failed",
"replication": {
  "replicationMode": "async",
  "georedundancy":{
    "targetAvailabilityZone": ["eu-fr-paris-1", "eu-fr-paris-2"],
    "uuid": "213-adf"
  }
},
"availability_zone": "eu-fr-north-1",
"resource_data":{
  "account_id": "345-tyt",
  "availabilityzone": {
    "eu-fr-paris-1": {
      "filer_id": 1,
      "filer_detail": "cmoprd123",
      "vol_uuid": "12-rte-45",
      "vol_name": "vqnxmo",
      "svm_id": 2,
      "svm_name": "svwe334",
      "aggr_name":"data_svwe334"
    },
    "eu-fr-paris-2": {
     "filer_id": 2,
     "filer_detail": "cmoprd23",
     "vol_uuid": "21-rte-45",
     "vol_name": "vqnxmo",
     "svm_id": 4,
     "svm_name": "svwe444",
     "aggr_name":"data_svwe444"
   },
   "eu-fr-north-1": {
     "filer_id": 5,
     "filer_detail": "cmoprd33",
     "vol_uuid": "123-rte-45",
     "vol_name": "vqnxmo",
     "svm_id": 3,
     "svm_name": "svwe434",
     "aggr_name":"data_svwe434"
   },

  }
},
"is_replicated": true
},
{"resource_id": "3-adf",
"status": "deleted",
"replication": {
  "replicationMode": "async",
  "targetAvailabilityZone":["eu-fr-paris-2"],
  "georedundancy":{
    "targetAvailabilityZone": ["eu-fr-north-1"],
    "uuid": "213-adf"
  }
},
"availability_zone": "eu-fr-paris-1",
"resource_data":{
  "account_id": "345-tyt",
  "availabilityzone": {
    "eu-fr-paris-1": {
      "filer_id": 1,
      "filer_detail": "cmoprd123",
      "vol_uuid": "12-rte-45",
      "vol_name": "vqnxmo",
      "svm_id": 2,
      "svm_name": "svwe334",
      "aggr_name":"data_svwe334"
    },
    "eu-fr-paris-2": {
     "filer_id": 2,
     "filer_detail": "cmoprd23",
     "vol_uuid": "21-rte-45",
     "vol_name": "vqnxmo",
     "svm_id": 4,
     "svm_name": "svwe444",
     "aggr_name":"data_svwe444"
   },
   "eu-fr-north-1": {
     "filer_id": 5,
     "filer_detail": "cmoprd33",
     "vol_uuid": "123-rte-45",
     "vol_name": "vqnxmo",
     "svm_id": 3,
     "svm_name": "svwe434",
     "aggr_name":"data_svwe434"
   },

  }
},
"is_replicated": true
},
{"resource_id": "4-adf",
"status": "ready",
"replication": {
  "replicationMode": "async",
  "targetAvailabilityZone":["eu-fr-paris-2"],
  "georedundancy":{
    "targetAvailabilityZone": ["eu-fr-north-1"],
    "uuid": "213-adf"
  }
},
"availability_zone": "eu-fr-paris-1",
"resource_data":{
  "account_id": "345-tyt",
  "availabilityzone": {
    "eu-fr-paris-1": {
      "filer_id": 1,
      "filer_detail": "cmoprd123",
      "vol_uuid": "12-rte-45",
      "vol_name": "vqnxmo",
      "svm_id": 2,
      "svm_name": "svwe334",
      "aggr_name":"data_svwe334"
    },
    "eu-fr-paris-2": {
     "filer_id": 2,
     "filer_detail": "cmoprd23",
     "vol_uuid": "21-rte-45",
     "vol_name": "vqnxmo",
     "svm_id": 4,
     "svm_name": "svwe444",
     "aggr_name":"data_svwe444"
   },
   "eu-fr-north-1": {
     "filer_id": 5,
     "filer_detail": "cmoprd33",
     "vol_uuid": "123-rte-45",
     "vol_name": "vqnxmo",
     "svm_id": 3,
     "svm_name": "svwe434",
     "aggr_name":"data_svwe434"
   },

  }
},
"is_replicated": true
},
{"resource_id": "5-adf",
"status": "ready",
"replication": {
  "replicationMode": "async",
  "targetAvailabilityZone":["eu-fr-paris-2"],
  "georedundancy":{
    "targetAvailabilityZone": ["eu-fr-north-1"],
    "uuid": "213-adf"
  }
},
"availability_zone": "eu-fr-paris-1",
"resource_data":{
  "account_id": "345-tyt",
  "availabilityzone": {
    "eu-fr-paris-1": {
      "filer_id": 1,
      "filer_detail": "cmoprd123",
      "vol_uuid": "12-rte-45",
      "vol_name": "vqnxmo",
      "svm_id": 2,
      "svm_name": "svwe334",
      "aggr_name":"data_svwe334"
    },
    "eu-fr-paris-2": {
     "filer_id": 2,
     "filer_detail": "cmoprd23",
     "vol_uuid": "21-rte-45",
     "vol_name": "vqnxmo",
     "svm_id": 4,
     "svm_name": "svwe444",
     "aggr_name":"data_svwe444"
   },
   "eu-fr-north-1": {
     "filer_id": 5,
     "filer_detail": "cmoprd33",
     "vol_uuid": "123-rte-45",
     "vol_name": "vqnxmo",
     "svm_id": 3,
     "svm_name": "svwe434",
     "aggr_name":"data_svwe434"
   },

  }
},
"is_replicated": true
},
{"resource_id": "6-adf",
"status": "ready",
"replication": {
  "replicationMode": "async",
  "targetAvailabilityZone":["eu-fr-paris-2"],
  "georedundancy":{
    "targetAvailabilityZone": ["eu-fr-north-1"],
    "uuid": "213-adf"
  }
},
"availability_zone": "eu-fr-paris-1",
"resource_data":{
  "account_id": "345-tyt",
  "availabilityzone": {
    "eu-fr-paris-1": {
      "filer_id": 1,
      "filer_detail": "cmoprd123",
      "vol_uuid": "12-rte-45",
      "vol_name": "vqnxmo",
      "svm_id": 2,
      "svm_name": "svwe334",
      "aggr_name":"data_svwe334"
    },
    "eu-fr-paris-2": {
     "filer_id": 2,
     "filer_detail": "cmoprd23",
     "vol_uuid": "21-rte-45",
     "vol_name": "vqnxmo",
     "svm_id": 4,
     "svm_name": "svwe444",
     "aggr_name":"data_svwe444"
   },
   "eu-fr-north-1": {
     "filer_id": 5,
     "filer_detail": "cmoprd33",
     "vol_uuid": "123-rte-45",
     "vol_name": "vqnxmo",
     "svm_id": 3,
     "svm_name": "svwe434",
     "aggr_name":"data_svwe434"
   },

  }
},
"is_replicated": true
},
{"resource_id": "7-adf",
"status": "ready",
"replication": {
  "replicationMode": "async",
  "targetAvailabilityZone":["eu-fr-paris-2"],
  "georedundancy":{
    "targetAvailabilityZone": ["eu-fr-north-1"],
    "uuid": "213-adf"
  }
},
"availability_zone": "eu-fr-paris-1",
"resource_data":{
  "account_id": "345-tyt",
  "availabilityzone": {
    "eu-fr-paris-1": {
      "filer_id": 1,
      "filer_detail": "cmoprd123",
      "vol_uuid": "12-rte-45",
      "vol_name": "vqnxmo",
      "svm_id": 2,
      "svm_name": "svwe334",
      "aggr_name":"data_svwe334"
    },
    "eu-fr-paris-2": {
     "filer_id": 2,
     "filer_detail": "cmoprd23",
     "vol_uuid": "21-rte-45",
     "vol_name": "vqnxmo",
     "svm_id": 4,
     "svm_name": "svwe444",
     "aggr_name":"data_svwe444"
   },
   "eu-fr-north-1": {
     "filer_id": 5,
     "filer_detail": "cmoprd33",
     "vol_uuid": "123-rte-45",
     "vol_name": "vqnxmo",
     "svm_id": 3,
     "svm_name": "svwe434",
     "aggr_name":"data_svwe434"
   },

  }
},
"is_replicated": true
},
{"resource_id": "8-adf",
"status": "ready",
"replication": {
  "replicationMode": "async",
  "targetAvailabilityZone":["eu-fr-paris-2"],
  "georedundancy":{
    "targetAvailabilityZone": ["eu-fr-north-1"],
    "uuid": "213-adf"
  }
},
"availability_zone": "eu-fr-paris-1",
"resource_data":{
  "account_id": "345-tyt",
  "availabilityzone": {
    "eu-fr-paris-1": {
      "filer_id": 1,
      "filer_detail": "cmoprd123",
      "vol_uuid": "12-rte-45",
      "vol_name": "vqnxmo",
      "svm_id": 2,
      "svm_name": "svwe334",
      "aggr_name":"data_svwe334"
    },
    "eu-fr-paris-2": {
     "filer_id": 2,
     "filer_detail": "cmoprd23",
     "vol_uuid": "21-rte-45",
     "vol_name": "vqnxmo",
     "svm_id": 4,
     "svm_name": "svwe444",
     "aggr_name":"data_svwe444"
   },
   "eu-fr-north-1": {
     "filer_id": 5,
     "filer_detail": "cmoprd33",
     "vol_uuid": "123-rte-45",
     "vol_name": "vqnxmo",
     "svm_id": 3,
     "svm_name": "svwe434",
     "aggr_name":"data_svwe434"
   },

  }
},
"is_replicated": true
},
{"resource_id": "9-adf",
"status": "ready",
"replication": {
  "replicationMode": "async",
  "targetAvailabilityZone":["eu-fr-paris-2"],
  "georedundancy":{
    "targetAvailabilityZone": ["eu-fr-north-1"],
    "uuid": "213-adf"
  }
},
"availability_zone": "eu-fr-paris-1",
"resource_data":{
  "account_id": "345-tyt",
  "availabilityzone": {
    "eu-fr-paris-1": {
      "filer_id": 1,
      "filer_detail": "cmoprd123",
      "vol_uuid": "12-rte-45",
      "vol_name": "vqnxmo",
      "svm_id": 2,
      "svm_name": "svwe334",
      "aggr_name":"data_svwe334"
    },
    "eu-fr-paris-2": {
     "filer_id": 2,
     "filer_detail": "cmoprd23",
     "vol_uuid": "21-rte-45",
     "vol_name": "vqnxmo",
     "svm_id": 4,
     "svm_name": "svwe444",
     "aggr_name":"data_svwe444"
   },
   "eu-fr-north-1": {
     "filer_id": 5,
     "filer_detail": "cmoprd33",
     "vol_uuid": "123-rte-45",
     "vol_name": "vqnxmo",
     "svm_id": 3,
     "svm_name": "svwe434",
     "aggr_name":"data_svwe434"
   },

  }
},
"is_replicated": true
},
{"resource_id": "10-adf",
"status": "ready",
"replication": {
  "replicationMode": "async",
  "targetAvailabilityZone":["eu-fr-paris-2"],
  "georedundancy":{
    "targetAvailabilityZone": ["eu-fr-north-1"],
    "uuid": "213-adf"
  }
},
"availability_zone": "eu-fr-paris-1",
"resource_data":{
  "account_id": "345-tyt",
  "availabilityzone": {
    "eu-fr-paris-1": {
      "filer_id": 1,
      "filer_detail": "cmoprd123",
      "vol_uuid": "12-rte-45",
      "vol_name": "vqnxmo",
      "svm_id": 2,
      "svm_name": "svwe334",
      "aggr_name":"data_svwe334"
    },
    "eu-fr-paris-2": {
     "filer_id": 2,
     "filer_detail": "cmoprd23",
     "vol_uuid": "21-rte-45",
     "vol_name": "vqnxmo",
     "svm_id": 4,
     "svm_name": "svwe444",
     "aggr_name":"data_svwe444"
   },
   "eu-fr-north-1": {
     "filer_id": 5,
     "filer_detail": "cmoprd33",
     "vol_uuid": "123-rte-45",
     "vol_name": "vqnxmo",
     "svm_id": 3,
     "svm_name": "svwe434",
     "aggr_name":"data_svwe434"
   },

  }
},
"is_replicated": true
},
{"resource_id": "11-adf",
"status": "ready",
"replication": {
  "replicationMode": "async",
  "targetAvailabilityZone":["eu-fr-paris-2"],
  "georedundancy":{
    "targetAvailabilityZone": ["eu-fr-north-1"],
    "uuid": "213-adf"
  }
},
"availability_zone": "eu-fr-paris-1",
"resource_data":{
  "account_id": "345-tyt",
  "availabilityzone": {
    "eu-fr-paris-1": {
      "filer_id": 1,
      "filer_detail": "cmoprd123",
      "vol_uuid": "12-rte-45",
      "vol_name": "vqnxmo",
      "svm_id": 2,
      "svm_name": "svwe334",
      "aggr_name":"data_svwe334"
    },
    "eu-fr-paris-2": {
     "filer_id": 2,
     "filer_detail": "cmoprd23",
     "vol_uuid": "21-rte-45",
     "vol_name": "vqnxmo",
     "svm_id": 4,
     "svm_name": "svwe444",
     "aggr_name":"data_svwe444"
   },
   "eu-fr-north-1": {
     "filer_id": 5,
     "filer_detail": "cmoprd33",
     "vol_uuid": "123-rte-45",
     "vol_name": "vqnxmo",
     "svm_id": 3,
     "svm_name": "svwe434",
     "aggr_name":"data_svwe434"
   },

  }
},
"is_replicated": true
},

  ];

  subscription: Subscription;


  constructor(private modalService: NgbModal, 
    private fb: FormBuilder, 
    private route: ActivatedRoute, private messageService: MessageService) { 
    // let myregion = this.route.snapshot.paramMap.get('region')|| 'undefined';
    // console.log("myregion is ", myregion);
    // if (this.region !== 'undefined' || this.region !== null) {
    //   this.region = this.zones[myregion];
    //   console.log("constr region is ", this.region)
    // } else {
    //   this.region = this.zones['eu-fr-paris'];
    //   console.log("else constr region is ", this.region)
    // }


  }

  ngOnInit(): void {
    this.cgform = this.fb.group({
      cg_id: new FormControl(),
      act_id: new FormControl(),
      status: new FormControl(),
      vol_name: new FormControl()


    });
    this.groups.forEach(item => 
      {
        this.ConsistencyGroups.push(
          new consistencyGroup(
            item.resource_id,
            item.availability_zone, 
            item.status,
            item.replication,
            item.resource_data.availabilityzone[item.availability_zone].vol_name, 
            item.is_replicated, 
            item, 
            item.resource_data.account_id, 
            item.tags)
          )
    }
    );

    console.log("region in init is ", this.region)  
    
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

    if (!this.resultGroups) {
      this.submit();
    } else {
      console.log("subcr", this.subscription)
    }


    console.log("consistency group is in init", this.ConsistencyGroups, this.resultGroups);
  
    this.cgform.valueChanges.subscribe(form => {
      console.log(JSON.stringify(form), typeof(form), form.cg_id, form.act_id, form.status, form.vol_name)
      this.resultGroups = this.find(form.cg_id, form.act_id, form.status, form.vol_name)
    })

  }

  // ngOnChanges(): void {
  //   console.log("triggered ngonchange")
  //   this.groups.forEach(item => 
  //     {

  //       this.ConsistencyGroups.push(
  //         new consistencyGroup(
  //           item.resource_id,
  //           item.availability_zone, 
  //           item.status,
  //           item.replication,
  //           item.resource_data.availabilityzone[item.availability_zone].vol_name, 
  //           item.is_replicated, 
  //           item, 
  //           item.resource_data.account_id, 
  //           item.tags)
  //         )

             
  //   }
  //   );
  //   console.log("changes consistency group is ", this.ConsistencyGroups);
  //   this.subscription = this.messageService.getMessage().subscribe(message => {
  //     if (message) {
  //       console.log("message received", message);
  //       this.region = this.zones[message.region];
  //       this.submit();
  //     } else {
  //       if (!this.region) {
  //         this.region = this.zones["eu-fr-paris"];
  //         this.submit();
  //       }
  //     }
  //   })

  //   if (!this.resultGroups) {
  //     this.submit();
  //   }

  //   this.cgform.valueChanges.subscribe(form => {
  //     //console.log(JSON.stringify(form), typeof(form), form.cg_id, form.act_id, form.status, form.vol_name)
  //     this.resultGroups = this.find(form.cg_id, form.act_id, form.status, form.vol_name)
  //   })
    
  // }

  ngOnDestroy(): void {
    this.subscription?this.subscription.unsubscribe(): '';
  }


  show(targetModal: NgbModal, cg: consistencyGroup): consistencyGroup{
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
     });
    this.nowData = cg;
    return this.nowData;
  }

  find(cg_id,act_id,status,vol_name): Array<consistencyGroup> {
    console.log("in find", cg_id, act_id, status, vol_name);
    if (cg_id === "" || cg_id === null){
      cg_id = undefined;
    }
    if (act_id === "" || act_id === null){
      act_id = undefined;
    }
    if (vol_name === "" || vol_name === null){
      vol_name = undefined;
    }
    if (status === "" || status === null){
      status = undefined;
    }
    let regionalgroups = this.ConsistencyGroups.filter((item) => this.region? this.region.indexOf(item.availability_zone) > -1: item)
    console.log("regional value is", this.region, regionalgroups, "value", cg_id, act_id, status, typeof(status), vol_name);
    if ((cg_id === undefined || cg_id === null) && (act_id === undefined || act_id === null)&& (status === undefined || status === null) && (vol_name === undefined || vol_name === null) ) {
      console.log('im here')
      this.resultGroups = regionalgroups;
      return this.resultGroups
    } else {
     // this.resultGroups = this.ConsistencyGroups.filter((item)=> cg_id? item.resource_id === cg_id: item).filter(item => act_id? item.account_id === act_id : item).filter(item => status? item.status === status: item).filter(item => vol_name? item.volume_name === vol_name: null)
      if (cg_id && !status && !act_id && !vol_name) {
        this.resultGroups = regionalgroups.filter((item)=> item.resource_id === cg_id)
      } else if (cg_id && act_id && !status && !vol_name){
        this.resultGroups = regionalgroups.filter((item)=> item.account_id === act_id && item.resource_id === cg_id) ;
      } else if (cg_id && !act_id && status && !vol_name){
        this.resultGroups = regionalgroups.filter((item)=> item.status === status && item.resource_id === cg_id) ;
      } else if (cg_id && !act_id && !status && vol_name){
        this.resultGroups = regionalgroups.filter((item)=> item.volume_name === vol_name && item.resource_id === cg_id) ;
      }else if (!cg_id && act_id && !status && !vol_name){
        this.resultGroups = regionalgroups.filter((item)=> item.account_id === act_id);
      } else if (!cg_id && act_id && status && !vol_name){
        this.resultGroups = regionalgroups.filter((item)=> item.account_id === act_id && item.status === status);
      } else if (!cg_id && act_id && !status && vol_name){
        this.resultGroups = regionalgroups.filter((item)=> item.account_id === act_id && item.volume_name === vol_name);
      }else if (!cg_id && !act_id && status && !vol_name) {
        this.resultGroups = regionalgroups.filter((item)=> item.status === status);
      } else if (!cg_id && !act_id  && status && vol_name) {
        this.resultGroups = regionalgroups.filter((item)=> item.status === status && item.volume_name === vol_name);
      } else if (!cg_id && !act_id && !status && vol_name) {
        this.resultGroups = regionalgroups.filter((item)=> item.volume_name === vol_name);
      } else {
        this.resultGroups = regionalgroups.filter((item)=> item.account_id === act_id && item.status === status && item.resource_id === cg_id && item.volume_name === vol_name);
      }
      console.log("now result is ", this.resultGroups)
      return this.resultGroups;
        
    }
    
  }

  submit() {
    console.log("in submit", this.cgform.value)
    this.resultGroups = this.find(this.cgform.value.cg_id, this.cgform.value.act_id, 
      this.cgform.value.status, this.cgform.value.vol_name)
    
  }



  onChange() {
    console.log("event");
    
  }
}

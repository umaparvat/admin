
export class consistencyGroup {
    resource_id: string;
    availability_zone: string;
    status: string;
    replication: object;
    volume_name: string;
    replicated: object;
    json_info: object;
    account_id: string;
    tags: Array<string>;

    constructor(resouce_id: string, availability_zone:string, 
        status: string, replication:object, volume_name: string, 
        replicated: object, json_info:object, account_id:string, tags: Array<string> ){
            this.resource_id = resouce_id;
            this.availability_zone = availability_zone;
            this.status = status;
            this.replication = replication;
            this.volume_name = volume_name;
            this.replicated = replicated;
            this.json_info = json_info;
            this.account_id = account_id;
            this.tags = tags;

    }
}
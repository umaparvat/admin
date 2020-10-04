import {Injectable} from "@angular/core";
import {Observable, Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class MessageService {
    private Subject = new Subject<any>();

    sendMessage(item: any){
        this.Subject.next(item);

    }

    clearMessages(){
        this.Subject.next();
    }

    getMessage(): Observable<any> {
        return this.Subject.asObservable();
    }
}
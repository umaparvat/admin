import {Injectable, Output, EventEmitter} from '@angular/core';


@Injectable()
export class AuthService {
    @Output() fireIsLoggedIn: EventEmitter<any> = new EventEmitter<any>(); 
    login(user:string, password:string): boolean {
        if ((user == 'uma'  && password == 'passw') || (user == 'admin' && password == 'admin')) {
            localStorage.setItem('username', user);
            this.fireIsLoggedIn.emit(user);
            return true;
        }
        return false;
    }
    logout(): any {
        localStorage.removeItem('username');
        this.fireIsLoggedIn.emit("Login");
    }
    getUser(): any {
        return localStorage.getItem('username');
    }

    isLoggedIn(): boolean {
        console.log("user is now", this.getUser())
        return this.getUser() !== null;
    }
    getEmitter() { 
        return this.fireIsLoggedIn; 
      }

}

export const  AUTH_PROVIDERS: Array<any> =[
    {provide: AuthService, useClass: AuthService}
]
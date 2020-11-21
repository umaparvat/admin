import {Injectable} from "@angular/core";
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from "@angular/router";
import {Observable } from 'rxjs';
import {AuthService} from "./_services/auth.service";

@Injectable()
export class LoggedInGuard implements CanActivate {

    constructor(private authService: AuthService) {}

    canActivate (
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
            const isLoggedIn = this.authService.isLoggedIn();
            console.log('canActivate', isLoggedIn);
            if (this.authService.getUser() == 'admin'){
                return true;
            }
            return false;
        }
}

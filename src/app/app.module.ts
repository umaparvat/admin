import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NgxPaginationModule} from "ngx-pagination";
import {Routes, Router, RouterModule, ActivatedRoute, ParamMap} from "@angular/router";



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConsistencygroupComponent } from './consistencygroup/consistencygroup.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ExportDirective } from './_directives/export.directive';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FilesystemComponent } from './filesystem/filesystem.component';
import { SnapshotComponent } from './snapshot/snapshot.component';
import { UserQuotaComponent } from './user-quota/user-quota.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { HomeComponent } from './home/home.component';
import { APP_BASE_HREF, HashLocationStrategy, LocationStrategy } from '@angular/common';
import {AUTH_PROVIDERS} from './_services/auth.service';
import {LoggedInGuard} from './logged-in.guard';
import { LogoutComponent } from './logout/logout.component';
import { GlobalinfoComponent } from './globalinfo/globalinfo.component';
import { NetworksvmsComponent } from './networksvms/networksvms.component';


const routes: Routes = [
  {path: '', redirectTo: 'Home', pathMatch: 'full'}, 
  {path: "Home", component: HomeComponent},
   
  {path: "ConsistencyGroup", component: ConsistencygroupComponent, pathMatch: "full"},
  {path: "filesystem", component: FilesystemComponent, pathMatch: "full"},
  {path: "snapshot", component: SnapshotComponent, pathMatch: 'full'},
  {path: "quotas", component: UserQuotaComponent, pathMatch: 'full'},
  {path: "login", component: UserComponent},
  //{path: "Admin", component: AdminComponent, pathMatch: 'full', canActivate: [LoggedInGuard]}, 
  {path: "globalInfo", component: GlobalinfoComponent, pathMatch: 'full', canActivate: [LoggedInGuard]},
  {path: "networkSvms", component: NetworksvmsComponent, pathMatch: 'full', canActivate: [LoggedInGuard]},
  {path:'**', component: PagenotfoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ConsistencygroupComponent,
    ExportDirective,
    NavBarComponent,
    FilesystemComponent,
    SnapshotComponent,
    UserQuotaComponent,
    AdminComponent,
    UserComponent,
    PagenotfoundComponent,
    HomeComponent,
    LogoutComponent,
    GlobalinfoComponent,
    NetworksvmsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
  providers: [
    //{provide: LocationStrategy, useClass: HashLocationStrategy},
    //{provide: APP_BASE_HREF, useValue: "/"}
    AUTH_PROVIDERS, LoggedInGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

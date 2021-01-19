import {BrowserModule} from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import * as blockstack from 'blockstack';
import { AuthGuard } from './services/AuthGuard';
import { AppService } from './services/app.service';
import { SharedModule } from './shared/shared.module';
import { ReactiveFormsModule} from '@angular/forms';
import { CustomReusingStrategy } from './services/custom';
import {LoaderInterceptor} from './services/loader.interceptor';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


import { LayoutModule } from '@angular/cdk/layout';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HighlightService } from './services/highligher.service';
import { MatTabsModule } from '@angular/material/tabs';



@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTabsModule
   
   
   
   
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
],


  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    //{provide: LocationStrategy, useClass: PathLocationStrategy},
    { provide: 'SESSIONSTORAGE', useValue: window.sessionStorage }, 
    AuthGuard, 
    { provide: RouteReuseStrategy, useClass: CustomReusingStrategy },
    AppService,
    HighlightService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

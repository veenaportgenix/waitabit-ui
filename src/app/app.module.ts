import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

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
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  
   
    
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,


    
   
  ],
  providers: [{ provide: 'LOCALSTORAGE', useValue: window.localStorage },AuthGuard, AppService   ],
  bootstrap: [AppComponent]
})
export class AppModule { }

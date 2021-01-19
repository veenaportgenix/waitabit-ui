import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { SharedModule } from '/shared/shared.module';

import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { GettingStartedComponent } from './getting-started.component';


const routes: Routes = [
  
  {path:'', component: GettingStartedComponent},
  { path: 'sign-up', component: SignUpComponent }
    
    
    
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    
    SignUpComponent

  ],
  exports: [
    RouterModule
  ]
})
export class GettingStartedRoutingModule { }
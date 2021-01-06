import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModule } from '../../shared/shared.module';

import { RouterModule, Routes } from '@angular/router';

import { PublicComponent } from '../public.component';
import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';

import { NavbarComponent } from '../navbar/navbar.component';


const routes: Routes = [
  {
    path: '', component: PublicComponent, children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'about', component: AboutComponent },
    
    ]
  }
]

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    PublicComponent,
    HomeComponent,
    AboutComponent,
  
    NavbarComponent,

  ],
  exports: [
    RouterModule
  ]
})
export class PublicRoutingModule { }
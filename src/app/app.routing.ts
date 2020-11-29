import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { AuthGuard } from './services/AuthGuard';
import {LandingLayoutComponent} from "./shared/components/layouts/landing-layout/landing-layout.component";
const routes: Routes =[
  {
    path: "",
   redirectTo: "landing/v10",
    pathMatch: "full",
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule',
        canActivate: [AuthGuard]
      }
    ]
  }, {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './layouts/auth-layout/auth-layout.module#AuthLayoutModule'
      }
    ]
  }, 
  {
    path: "",
    component: LandingLayoutComponent,
    children: [
      {
        path: "landing",
        loadChildren: () =>
          import("./views/landing/landing.module").then((m) => m.LandingModule),
      },
    ],
  },

 
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }

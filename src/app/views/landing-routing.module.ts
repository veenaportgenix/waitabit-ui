import { NgModule } from "@angular/core";


import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
//import { DocumentationComponent } from './documentation/documentation.component';
import { DocsModule } from '../docs/docs.module'



const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  
  {
    path: "home",
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }

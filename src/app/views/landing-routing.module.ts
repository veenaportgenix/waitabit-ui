import { NgModule } from "@angular/core";


import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { DocumentationComponent } from './documentation/documentation.component';



const routes: Routes = [
  {
    path: "",
    data:{
      reuse:true  
    }, 
    component: HomeComponent
  },
  
  {
    path: "home",
    data:{
      reuse:true  
    }, 
    component: HomeComponent
  },
  {
    path: "documentation",
    data:{
      reuse:true  
    }, 
    component: DocumentationComponent
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }

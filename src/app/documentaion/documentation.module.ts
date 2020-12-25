import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule,Routes } from '@angular/router';
import { GetStartComponent } from '../documentaion/get-start/get-start.component';
import{DocumentationComponent}from '../documentaion/documentation.component'
const routes: Routes = [
  { path: 'getStart', component: GetStartComponent }
  
]
@NgModule({
  declarations: [DocumentationComponent,GetStartComponent],

  bootstrap: [DocumentationComponent],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ]
})
export class DocumentationModule { }

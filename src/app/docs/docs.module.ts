import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgDocxModule, NgDocxComponent } from 'ng-docx';
import { Routes, RouterModule } from '@angular/router';

const fileNames = ['getting started'];
const routes: Routes = [
  {
    path: '',
    children: [{ path: '', component: NgDocxComponent }]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgDocxModule.forRoot({
      files: fileNames
    }),
    RouterModule.forChild(routes)
  ]
})


export class DocsModule { }

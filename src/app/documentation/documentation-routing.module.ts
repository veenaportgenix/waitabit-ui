import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModule } from '../shared/shared.module';

import { RouterModule, Routes } from '@angular/router';

import { DocumentationComponent } from './documentation.component';
import { GettingStartedComponent } from './getting-started/getting-started.component';
import { IntegrationComponent } from './integration/integration.component';


import { TemplatesComponent } from './templates/templates.component';


const routes: Routes = [
  {
    path: '', component: DocumentationComponent, children: [
      { path: '', redirectTo: 'get-start', pathMatch: 'full' },
     {path: 'get-start',
      loadChildren: () => import('./getting-started/getting-started.module').then(m => m.GettingStartedModule) },
           { path: 'integration', component: IntegrationComponent },
      { path: 'templates', component: TemplatesComponent },
    
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
    DocumentationComponent,
    GettingStartedComponent,
    IntegrationComponent,
    TemplatesComponent,
  

  ],
  exports: [
    RouterModule
  ]
})
export class DocumentationRoutingModule { }
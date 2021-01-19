import { NgModule } from '@angular/core';
import { NgbModule, NgbNavModule} from '@ng-bootstrap/ng-bootstrap';

import { DocumentationRoutingModule } from './documentation-routing.module';
import { MatTabsModule } from '@angular/material/tabs';





@NgModule({
  imports: [
    DocumentationRoutingModule,
    NgbModule,
    NgbNavModule,
    MatTabsModule
  ],
  declarations: []  
})
export class DocumentationModule { }